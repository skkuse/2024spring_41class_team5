FROM python:3.12

WORKDIR /workspace

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host=0.0.0.0", ">", "log/log.txt", "2>&1"]