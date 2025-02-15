import io

from fastapi import FastAPI, File, UploadFile, Depends
from decord import VideoReader
from fastapi.responses import JSONResponse

from back.database.connection.session import SessionLocal, get_session
from back.database.models.user import User

app = FastAPI()


@app.post("/process-video")
async def process_video(file: UploadFile = File(...)):
    contents = await file.read()

    # Создаем файлоподобный объект из байтов
    video_buffer = io.BytesIO(contents)

    # Передаем его в VideoReader
    vr = VideoReader(video_buffer)
    frames = [frame.asnumpy() for frame in vr]
    print(type(frames[0]))
    return JSONResponse(content={"frame_count": len(frames)})


@app.post("/register-user")
async def register(session: SessionLocal = Depends(get_session)):
    new_user = User(
        id=1,
        login="123",
        first_name="789",
        last_name="456"
    )

    session.add(new_user)
    session.commit()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)