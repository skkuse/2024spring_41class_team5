FROM python:3.12

WORKDIR /workspace

COPY requirements.txt .

RUN apt-get update && \
    apt-get install -y \
    openjdk-17-jdk

RUN pip install -r requirements.txt

RUN mkdir -p /workspace/logs

RUN touch /workspace/logs/log.txt

COPY . .