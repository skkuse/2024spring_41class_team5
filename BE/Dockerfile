FROM python:3.12

WORKDIR /workspace

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# ENTRYPOINT ["uvicorn", "main:app", "--host=0.0.0.0"]

ENTRYPOINT ["/bin/bash"]