FROM pytorch/pytorch:2.2.1-cuda12.1-cudnn8-runtime
RUN python3 -m pip install --upgrade pip
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
# --index-url=https://mirrors.aliyun.com/pypi/simple/
RUN apt install git -y
RUN pip install --no-cache-dir "git+https://github.com/ultralytics/CLIP.git"
RUN apt install wget
RUN wget  https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8x-world.pt
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
