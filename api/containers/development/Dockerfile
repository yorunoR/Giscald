FROM python:3.12-bookworm

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /api

RUN apt-get update -qq \
    && apt-get install -y --no-install-recommends \
    build-essential \
    && pip install --upgrade pip \
    && pip install poetry==1.7 \
    && poetry config virtualenvs.create false \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
