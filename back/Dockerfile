FROM python:3.10-slim

WORKDIR /back

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --index-url=https://mirrors.aliyun.com/pypi/simple/

COPY .. .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
