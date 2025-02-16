import io

from PIL import Image
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, Form
from decord import VideoReader
from fastapi.responses import JSONResponse

from config import cfg
#from database.connection.session import SessionLocal, get_session
#from database.models.user import User

from searcher import Searcher
                                

app = FastAPI(
    title=cfg.app_name,
    description=cfg.app_desc,
    version=cfg.app_version,
    debug=cfg.debug,
)

searcher = None

features = {
     'просмотр камер': 'просмотр камер видеонаблюдения с возможностью масштабирования и ночного видения',
     'заказ продуктов': 'заказ свежих продуктов с доставкой на дом',
     'заказ пропуска': 'заказу пропуска для входа в здание',
     'заявка на ремонт окон': 'оформление заявки на ремонт окон с выбором времени и специалистов'
}

@app.on_event("startup")
async def load_models():
    global searcher
    searcher = Searcher(features)


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
             device=device,
            image=pil_image,
            prompt=prompt
        )

        contains_person = len(bbox_result) != 0

        if contains_person:
            current_time = idx / fps  # Конвертируем кадры в секунды
            first_time = current_time
            break

    return JSONResponse(content={"first_person_appearance_seconds": first_time})


@app.post("/search")
def findtop(data: dict):
    print(data['text'])
    response = {'features': Searcher.query(data['text'])}
    return response
'''
@app.post("/register-user")
async def register(session: SessionLocal = Depends(get_session)):
    user_id=1
    existing_user = session.query(User).filter(User.id == user_id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    new_user = User(
        id=1,
        login="123",
        first_name="789",
        last_name="456"
    )

    session.add(new_user)
    session.commit()
'''

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)