FROM pytorch/pytorch:2.2.1-cuda12.1-cudnn8-runtime
RUN python3 -m pip install --upgrade pip
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
COPY ./requirements.txt ./requirements.txt
RUN pip install -r ./requirements.txt
COPY . .


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]