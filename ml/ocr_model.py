import easyocr
import torch
import cv2


class SimpleOCR:
    def __init__(self):
        self.use_gpu = torch.cuda.is_available()
        self.reader = easyocr.Reader(['en', 'ru'], gpu=self.use_gpu)

    # conf - порог уверенности
    def get_text_from_image(self, image_path, conf=0.5):
        image = cv2.imread(image_path)
        outs = self.reader.readtext(image)
        texts = [text[1] for text in outs if text[2] >= conf]
        return ' '.join(texts) if texts else ''
    
    
# example
# ocr = SimpleOCR()
# text = ocr.get_text_from_image('path to image') # распознанный с фото текст