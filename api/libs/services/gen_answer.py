import time

import litellm

# litellm.set_verbose = True


async def chat(messages, model, host, api_key, temperature, max_tokens, top_p, stop, frequency_penalty):
    response = await litellm.acompletion(
        messages=messages,
        model=model,
        api_base=host,
        api_key=api_key,
        temperature=temperature,
        max_tokens=max_tokens,
        top_p=top_p,
        stop=stop,
        frequency_penalty=frequency_penalty,
    )

    return {
        "answer": response.choices[0].message.content,
        "finish_reason": response.choices[0].finish_reason,
        "usage": response.usage.dict(),
        "question": messages,
    }


async def chat_with_job_info(info, messages, model, host, api_key, temperature=0, max_tokens=512, top_p=None, stop=None, frequency_penalty=2):
    start = time.perf_counter()
    response = await chat(messages, model, host, api_key, temperature, max_tokens, top_p, stop, frequency_penalty)
    end = time.perf_counter()

    if response["finish_reason"] == "length":
        print("ALERT: Rerun due to insufficient max_tokens.")
        print(info)
        start = time.perf_counter()
        response = await chat(messages, model, host, api_key, temperature, max_tokens + 512, top_p, stop, frequency_penalty)
        end = time.perf_counter()

    processing_time = end - start

    return {"info": info, "response": response, "processing_time": processing_time}
