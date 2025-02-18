import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from rag_bot import RAGChatBot, roles
from config import cfg
from searcher import Searcher
                         
                                
root_path = os.environ.get("ROOT_PATH", "")
app = FastAPI(
    title=cfg.app_name,
    description=cfg.app_desc,
    version=cfg.app_version,
    debug=cfg.debug,
    root_path='/api'
)

searcher, bot = None, None

features = {
     'просмотр камер': 'просмотр камер видеонаблюдения с возможностью масштабирования и ночного видения',
     'заказ продуктов': 'заказ свежих продуктов с доставкой на дом',
     'заказ пропуска': 'заказу пропуска для входа в здание',
     'заявка на ремонт окон': 'оформление заявки на ремонт окон с выбором времени и специалистов'
}


@app.on_event("startup")
async def load_models():
    global searcher, bot
    searcher = Searcher(features)
    api_key = '...'
    bot = RAGChatBot(
        system_prompt=roles['помощник'],
        data_sources=[
            ('file', 'data/faq.html'),
        ],
        from_huggingface=False,
        gigachat_api_key=api_key,
        embeddings_model='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
    )


class Answer(BaseModel):
    answer: str
    source: str


@app.post("/chat")
async def chat(
        prompt: str
):
    ans, sources = bot.chat(prompt)
    source = None
    if len(sources) > 0:
        source = sources[0].metadata['source']
    return Answer(answer=ans, source=source)


@app.post("/add_source")
async def add_source(file: UploadFile = File(...)):
    uploads_dir = "data"
    os.makedirs(uploads_dir, exist_ok=True)
    file_location = os.path.join(uploads_dir, file.filename)

    try:
        with open(file_location, "wb") as f:
            shutil.copyfileobj(file.file, f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сохранения файла: {e}")

    try:
        # Добавляем источник; тип источника указан как 'file'
        bot.add_sources([("file", file_location)])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при добавлении источника: {e}")

    return {"message": "Источник успешно добавлен", "filename": file.filename}


@app.post("/search")
def findtop(msg: str):
    response = {'features': searcher.query(text=msg)}
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