import time

import litellm

# litellm.set_verbose = True


async def chat(messages, model, host, api_key, params):
    print(params)

    response = await litellm.acompletion(messages=messages, model=model, api_base=host, api_key=api_key, **params)

    return {
        "answer": response.choices[0].message.content,
        "finish_reason": response.choices[0].finish_reason,
        "usage": response.usage.dict(),
        "question": messages,
    }


async def chat_with_job_info(info, messages, model, host, api_key, params):
    print(info)

    start = time.perf_counter()
    response = await chat(messages, model, host, api_key, params)
    end = time.perf_counter()

    if response["finish_reason"] == "length":
        print("ALERT: Rerun due to insufficient max_tokens.")
        print(info)
        start = time.perf_counter()
        max_tokens = params.get("max_tokens", 1000)
        new_params = dict(**params)
        new_params["max_tokens"] = max_tokens + 500
        response = await chat(messages, model, host, api_key, new_params)
        end = time.perf_counter()

    processing_time = end - start

    return {"info": info, "response": response, "processing_time": processing_time}
