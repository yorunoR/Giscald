import time

import litellm

from libs.services.prompt_logger import callbacks

# litellm.set_verbose = True
litellm.success_callback = callbacks
litellm.failure_callback = callbacks


async def chat(messages, model, host, api_key, metadata, strategy, params):
    print(params)

    try:
        timeout = 60
        new_messages = None
        response = await litellm.acompletion(
            messages=messages, model=model, api_base=host, api_key=api_key, timeout=timeout, metadata=metadata, **params
        )
        if strategy == "self-reflection":
            content = response.choices[0].message.content
            new_messages = messages + [
                {"role": "assistant", "content": content},
                {"role": "user", "content": "より深く考え、上の回答を修正し、提出する最終回答を書いて下さい。\n最終回答:\n"},
            ]
            max_tokens = params.get("max_tokens", 1000)
            new_params = dict(**params)
            new_params["max_tokens"] = max_tokens + 300
            response = await litellm.acompletion(
                messages=new_messages, model=model, api_base=host, api_key=api_key, metadata=metadata, **params
            )
    except Exception as e:
        print(e)
        return {
            "answer": "[[0]]",
            "finish_reason": "evaluator",
            "usage": {"total_tokens": 0, "prompt_tokens": 0, "completion_tokens": 0},
            "question": new_messages or messages,
        }

    return {
        "answer": response.choices[0].message.content,
        "finish_reason": response.choices[0].finish_reason,
        "usage": response.usage.dict(),
        "question": new_messages or messages,
    }


async def chat_with_job_info(info, messages, model, host, api_key, metadata, strategy, params):
    print(info)

    start = time.perf_counter()
    response = await chat(messages, model, host, api_key, metadata, strategy, params)
    end = time.perf_counter()

    if response["finish_reason"] == "length":
        print("ALERT: Rerun due to insufficient max_tokens.")
        print(info)
        start = time.perf_counter()
        max_tokens = params.get("max_tokens", 1000)
        new_params = dict(**params)
        new_params["max_tokens"] = max_tokens + 300
        response = await chat(messages, model, host, api_key, metadata, strategy, new_params)
        end = time.perf_counter()

    processing_time = end - start

    return {"info": info, "response": response, "processing_time": processing_time}
