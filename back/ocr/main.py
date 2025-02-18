import ocr_model
from fastapi import FastAPI

ocr = ocr_model.SimpleOCR()
app = FastAPI()


@app.get("/device")
def device():
    return str(ocr.use_gpu)


@app.get("/")
def pred(data: dict):
    img = data['image']
    response = ocr.get_text_from_image(img, confidence=data['confidence'])
    return response