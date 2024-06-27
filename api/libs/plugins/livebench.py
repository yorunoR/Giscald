import time

from tqdm import tqdm

from livebench.common import LIVE_BENCH_DATA_SUPER_PATH, MatchSingle, get_model_list, load_model_answers, load_questions, make_match_single
from livebench.process_results.coding.utils import LCB_generation_process_results
from livebench.process_results.data_analysis.cta.utils import cta_process_results
from livebench.process_results.data_analysis.tablejoin.utils import joinmap_process_results

# todo: find a better solution than all these imports. This is not good practice.
from livebench.process_results.data_analysis.tablereformat.utils import table_process_results
from livebench.process_results.instruction_following.utils import instruction_following_process_results
from livebench.process_results.math.AMPS_Hard.utils import amps_hard_process_results
from livebench.process_results.math.math_competitions.utils import aime_process_results, mathcontest_process_results
from livebench.process_results.math.olympiad.utils import proof_rearrangement_process_results
from livebench.process_results.reasoning.house_traversal.utils import house_traversal_process_results
from livebench.process_results.reasoning.web_of_lies_v2.utils import web_of_lies_process_results
from livebench.process_results.reasoning.zebra_puzzle.utils import zebra_puzzle_process_results
from livebench.process_results.writing.connections.utils import connections_process_results
from livebench.process_results.writing.plot_unscrambling.utils import plot_unscrambling_process_results
from livebench.process_results.writing.typos.utils import typos_process_results


def play_a_match_gt(match: MatchSingle):
    question, model, answer = (
        match.question,
        match.model,
        match.answer,
    )
    coding_test_case_tasks = ["coding_completion", "LCB_generation"]
    if (
        "ground_truth" not in question
        and "reference" not in question
        and question["task"] not in coding_test_case_tasks
        and question["category"] != "instruction_following"
    ):
        raise ValueError("Questions must have ground_truth to run gen_ground_truth_judgment.")

    task = question["task"]
    task_or_subtask = question["subtask"] if "subtask" in question.keys() else question["task"]
    question_text = question["turns"][0]
    ground_truth = question.get("ground_truth", None)
    llm_answer = answer["choices"][0]["turns"][-1]
    score = 0
    category = None

    # todo: find a better solution than a long if statement.
    if task_or_subtask.split("_")[0] in ["amc", "smc"]:
        score = mathcontest_process_results(ground_truth, llm_answer)
        category = "math"
    elif task_or_subtask.split("_")[0] == "aime":
        score = aime_process_results(ground_truth, llm_answer)
        category = "math"
    elif task_or_subtask.split("_")[0] in ["imo", "usamo"]:
        score = proof_rearrangement_process_results(ground_truth, llm_answer, edit_distance=True)
        category = "math"
    elif task_or_subtask == "cta":
        score = cta_process_results(ground_truth, llm_answer)
        category = "data_analysis"
    elif task_or_subtask == "tablereformat":
        score = table_process_results(question_text, ground_truth, llm_answer)
        category = "data_analysis"
    elif task_or_subtask == "tablejoin":
        score = joinmap_process_results(question_text, ground_truth, llm_answer)
        category = "data_analysis"
    elif "amps_hard" in task_or_subtask:
        score = amps_hard_process_results(ground_truth, llm_answer)
        category = "math"
    elif task_or_subtask == "web_of_lies_v2":
        score = web_of_lies_process_results(ground_truth, llm_answer)
        category = "reasoning"
    elif task_or_subtask == "house_traversal":
        score = house_traversal_process_results(ground_truth, llm_answer)
        category = "reasoning"
    elif task_or_subtask == "zebra_puzzle":
        score = zebra_puzzle_process_results(ground_truth, llm_answer)
        category = "reasoning"
    elif task_or_subtask == "typos":
        score = typos_process_results(ground_truth, llm_answer)
        category = "language"
    elif task_or_subtask == "connections":
        score = connections_process_results(ground_truth, llm_answer)
        category = "language"
    elif task_or_subtask == "plot_unscrambling":
        score = plot_unscrambling_process_results(ground_truth, llm_answer)
        category = "language"
    elif task_or_subtask in coding_test_case_tasks:
        # use entire question object, because there are test cases inside.
        score = LCB_generation_process_results(question, llm_answer)
        category = "coding"
    else:
        raise NotImplementedError(f"This task ({task_or_subtask}) has not been implemented yet.")

    if not category:
        raise NotImplementedError("A category must be assigned to each task")

    return {
        "question_id": question["question_id"],
        "task": task,
        "model": model,
        "score": score,
        "turn": 1,
        "tstamp": time.time(),
        "category": category,
    }


def evaluate(args, categories, tasks):
    for category_name, task_names in tasks.items():
        for task_name in task_names:
            questions = load_questions(categories[category_name], task_name, args.question_begin, args.question_end)

            task_full_name = f"{LIVE_BENCH_DATA_SUPER_PATH}/{category_name}/{task_name}"

            answer_dir = f"data/{task_full_name}/model_answer/"

            model_answers = load_model_answers(answer_dir)

            if args.model_list is None:
                models = get_model_list(answer_dir)
            else:
                models = args.model_list

            matches = []
            matches += make_match_single(
                questions,
                models,
                model_answers,
            )

            if "instruction_following" in category_name:
                task_name = matches[0].question["task"]

                for model_id in models:
                    scores = instruction_following_process_results(questions, model_answers, task_name, model_id)
                    for item in scores:
                        score = item["score"]
                        return {
                            "question_id": item["question_id"],
                            "task": task_name,
                            "model": model_id,
                            "score": score,
                            "turn": 1,
                            "tstamp": time.time(),
                            "category": "instruction_following",
                        }

            else:
                for match in tqdm(matches):
                    return play_a_match_gt(match)
