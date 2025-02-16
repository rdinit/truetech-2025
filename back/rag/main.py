import os

from fastapi import FastAPI

from back.api.rag_bot import RAGChatBot, roles

app = FastAPI()

bot = None


@app.on_event("startup")
async def load_models():
    global bot
    api_key = os.environ.get("api_key")
    bot = RAGChatBot(
        # save_path='vector_store_1.index',
        system_prompt=roles['помощник'],
        data_sources=[
            ('file', 'data/faq.html'),  # PDF
        ],
        from_huggingface=False,
        gigachat_api_key='NjBiZDkyMTItOTVlYi00ZGE4LTlmM2YtNGExZWVhZTQ3MDQxOmNkMjkwZWZhLTVmOTAtNDQ0ZS1iZDY0LWY0MjEyY2ViMzg0Nw==',
        embeddings_model='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
    )





if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
