import asyncio
import os
import re
import time

from asgiref.sync import sync_to_async
from strawberry import ID
from strawberry.types import Info

from libs.models import EvaluationTask, GenerationTask, Rate
from libs.models.evaluation_task import Status as EvaluationTaskStatus
from libs.models.generation_task import Status as GenerationTaskStatus
from libs.services.gen_answer import chat_with_job_info


def extract_and_convert_to_int(input_str):
    match = re.search(r"\d+", input_str)
    if match:
        return int(match.group())
    else:
        return 0


tengu_example_question = "「急がば回れ」という言葉について説明してください。"
tengu_example_answer = (
    "「急がば回れ」という言葉は、日本の諺の一つであり、直接的な意味は「急ぐときは、早道や危険な方法を選ばずに、"
    "むしろ回り道で確実で安全な道を通った方が結局は早く着けるものだ」というものです。"
    "この言葉は、物事は慌てずに着実に進めることが結果としてうまくいくという教訓を含んでいます"
)
tengu_example_eval_aspect = (
    "- 本来の「急ぐときは、早道や危険な方法を選ばずに、むしろ回り道で確実で安全な道を通った方が結局は早く着ける」"
    "という意味について説明している:3点\n"
    "- 一般化した「物事は慌てずに着実に進めることが結果としてうまくいく」という意味について説明している:3点\n"
    "- ことわざであることを示している:2点\n- 説明は具体的でわかりやすい:1点\n- 自然な日本語である:1点"
)
tengu_example_correct_answer = (
    "「急がば回れ」とは、物事を急いで進めるよりも、慎重に計画を立てて行動する方が結果が良くなるという意味のことわざです。"
    "つまり、無駄なミスやトラブルを避けるためには、急いで手を打つのではなく、ゆっくりと計画を練り、"
    "周囲をよく考えて行動することが大切だということを教えています。急いで物事を進めようとして失敗してしまうよりも、"
    "手間と時間をかけてじっくりと準備をする方が結果的に効率的で成功する可能性が高いという教訓を持つ言葉です。"
)

tengu_example_evaluation = """[該当する評価項目とその簡潔な理由]
- 一般化した「物事は慌てずに着実に進めることが結果としてうまくいく」という意味について説明している:3点
  - 「物事を急いで進めるよりも、慎重に計画を立てて行動する方が結果が良くなるという意味」と示している。
- ことわざであることを示している:2点
  - 「ことわざです」と書いてある。
- 説明は具体的でわかりやすい:1点
  - 言い換えたりしながら詳しく説明されている。
- 自然な日本語である:1点
  - 日本語の用法が全て正しい。
[計算式]
3+2+1+1=7
[点数]
[[7]]"""


async def resolve(info: Info, generation_task_id: ID, eval_name: str, model: str, worker_count: int):
    api_key = "EMPTY"
    if model.startswith("gpt"):
        api_key = os.getenv("OPENAI_API_KEY")
    if model.startswith("gemini"):
        api_key = os.getenv("GEMINI_API_KEY")
    if model.startswith("claude"):
        api_key = os.getenv("ANTHROPIC_API_KEY")
    if model.startswith("command"):
        api_key = os.getenv("COHERE_API_KEY")

    user = info.context.user
    generation_task = await GenerationTask.objects.select_related("bench").aget(
        id=generation_task_id, user=user, status=GenerationTaskStatus.COMPLETED
    )
    evaluation_task = await EvaluationTask.objects.acreate(
        user=user, generation_task=generation_task, name=eval_name, points={}, processing_times={}, status=EvaluationTaskStatus.STARTED
    )

    template = generation_task.bench.template

    try:
        jobs = []
        async for answer in generation_task.answers.select_related("question").order_by("id").all():
            question = answer.messages[0]["content"]
            correct_answer = answer.question.correct_answers[0] if answer.question.correct_answers else None
            eval_aspect = answer.question.eval_aspects[0] if answer.question.eval_aspects else None
            content = template.format(question=question, answer=answer.text, correct_answer=correct_answer, eval_aspect=eval_aspect)
            if generation_task.bench.name == "Tengu Bench origin":
                example_user_content = template.format(
                    question=tengu_example_question,
                    answer=tengu_example_answer,
                    correct_answer=tengu_example_correct_answer,
                    eval_aspect=tengu_example_eval_aspect,
                )
                example_assistant_content = tengu_example_evaluation
                messages = [
                    {"role": "system", "content": "評価の点数は必ず[[数字]]の形式で示す。説明は簡潔にする。"},
                    {"role": "user", "content": example_user_content},
                    {"role": "assistant", "content": example_assistant_content},
                    {"role": "user", "content": content},
                ]
            else:
                messages = [
                    {"role": "system", "content": "評価の点数は必ず[[数字]]の形式で示す。説明は簡潔にする。"},
                    {"role": "user", "content": content},
                ]
            # if correct_answers:
            #     messages.append({"role": "user", "content": f"正しい答えは次のようになります。{correct_answers[0]}"})
            params = {"temperature": 0, "max_tokens": 1500}
            jobs.append(chat_with_job_info(answer, messages, model, host=None, api_key=api_key, strategy="none", params=params))
            if len(jobs) == worker_count:
                results = await asyncio.gather(*(asyncio.wait_for(job, timeout=180) for job in jobs), return_exceptions=True)
                jobs = []
                for result in results:
                    try:
                        if isinstance(result, asyncio.exceptions.CancelledError):
                            raise Exception("Timeout")
                        answer = result["response"]["answer"]
                        match = re.search(r"\[\[(.+)\]\]", answer)
                        point = 0
                        if match is not None:
                            point = extract_and_convert_to_int(match.group(1))
                        if point == 0 and answer.isdigit():
                            point = int(answer)
                        await Rate.objects.acreate(
                            user=user,
                            evaluation_task=evaluation_task,
                            answer=result["info"],
                            text=result["response"]["answer"],
                            usage=result["response"]["usage"],
                            finish_reason=result["response"]["finish_reason"],
                            processing_time=result["processing_time"],
                            point=point,
                            model=model,
                        )
                    except Exception as e:
                        print(result)
                        raise e
                if model.startswith("gemini"):
                    time.sleep(10)
                if model.startswith("gemini/gemini-1.5"):
                    time.sleep(15)
                if model.startswith("claude"):
                    time.sleep(10)
                if model.startswith("command"):
                    time.sleep(5)
        evaluation_task.status = EvaluationTaskStatus.COMPLETED
        await sync_to_async(lambda: evaluation_task.save())()
        return evaluation_task
    except Exception as e:
        print(e)
        evaluation_task.status = EvaluationTaskStatus.FAILED
        await sync_to_async(lambda: evaluation_task.save())()
        return evaluation_task
