FROM pytorch/pytorch:2.2.1-cuda12.1-cudnn8-runtime
#FROM python:3.10-slim

#WORKDIR /back

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --index-url=https://mirrors.aliyun.com/pypi/simple/
RUN pip install python-multipart
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
