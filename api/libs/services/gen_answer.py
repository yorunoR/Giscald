import litellm

# litellm.set_verbose = True


async def chat(messages, model, host, api_key, temperature=0, max_tokens=512, top_p=None, stop=None, frequency_penalty=2):
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

    return {"answer": response.choices[0].message.content, "question": messages}
