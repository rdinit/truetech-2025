from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from time import sleep
import ocr_model
from fastapi import FastAPI, File, UploadFile, Depends

ocr = SimpleOCR()


app = FastAPI()

@app.get("/device")
def device():
    return str(ocr.use_gpu)

@app.get("/")
def pred(data: dict):
    img = data['image']
    response = ocr.get_text_from_image(img, confidence=data['confidence'])
    return response