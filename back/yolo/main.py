from preprocess_image_yolo import load_model, get_od
from fastapi import FastAPI, UploadFile, File, Form
from decord import VideoReader
from PIL import Image
from fastapi.responses import JSONResponse
app = FastAPI()

model, processor, device = None, None, None

@app.on_event("startup")
async def load_models():
    global model, processor, device
    model = load_model(size="extra")  # или 'large'




@app.post("/process-video")
async def process_video(
    prompt: str = Form(...),
    file: UploadFile = File(...),
):
    if model is None:
        return JSONResponse(
            content={"error": "Model not initialized"},
            status_code=500
        )
    prompt = "man"
    # Чтение видео
    contents = await file.read()
    video_buffer = io.BytesIO(contents)

    # Загружаем видео
    vr = VideoReader(video_buffer)
    fps = vr.get_avg_fps()  # Получаем FPS видео
    frame_interval = int(fps * 10)  # Количество кадров за 10 секунд
    total_frames = len(vr)

    first_time = None
    for idx in range(0, total_frames, frame_interval):
        frame = vr[idx].asnumpy()
        pil_image = Image.fromarray(frame)

        raw_result, bbox_result = get_od(
            model=model,
            # processor=processor,
            # device=device,
            image=pil_image,
            prompt=prompt
        )

        contains_person = len(bbox_result) != 0

        if contains_person:
            current_time = idx / fps  # Конвертируем кадры в секунды
            first_time = current_time
            break

    return JSONResponse(content={"first_person_appearance_seconds": first_time})

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)