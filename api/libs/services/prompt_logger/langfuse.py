import os

public_key = os.getenv("LANGFUSE_PUBLIC_KEY")
secret_key = os.getenv("LANGFUSE_SECRET_KEY")

callbacks = []

if public_key and secret_key:
    callbacks = ["langfuse"]
