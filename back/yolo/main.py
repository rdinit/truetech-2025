from fastapi import FastAPI, UploadFile, File
from decord import VideoReader
from PIL import Image
import io
from fastapi.responses import JSONResponse
from preprocess_image_yolo import load_model, get_od

app = FastAPI()
model, processor, device = None, None, None


@app.on_event("startup")
async def load_models():
    global model, processor, device
    model = load_model(size="extra")  # или 'large'


@app.post("/process-video")
async def process_video(
    file: UploadFile = File(...),
):
    if model is None:
        return JSONResponse(
            content={"error": "Model not initialized"},
            status_code=500
        )
    # Чтение видео
    contents = await file.read()
    video_buffer = io.BytesIO(contents)

    # Загружаем видео
    vr = VideoReader(video_buffer)
    fps = vr.get_avg_fps()  # Получаем FPS видео
    frame_interval = int(fps * 1)  # Количество кадров за 1 секунд
    total_frames = len(vr)

    first_time = None
    for idx in range(0, total_frames, frame_interval):
        frame = vr[idx].asnumpy()
        pil_image = Image.fromarray(frame)

        results = get_od(
            model=model,
            image=pil_image,
        )

        for result in results:
            if len(result.boxes) != 0:
                pil_image.show()
                current_time = idx / fps  # Конвертируем кадры в секунды
                first_time = current_time
                break

        if first_time is not None:
            break

    return JSONResponse(content={"first_person_appearance_seconds": first_time})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
