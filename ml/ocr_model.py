import easyocr
import torch
import cv2


class SimpleOCR:
    def __init__(self):
        self.use_gpu = torch.cuda.is_available()
        self.reader = easyocr.Reader(['en', 'ru'], gpu=self.use_gpu)

    def get_text_from_image(self, image_path):
        image = cv2.imread(image_path)
        outs = self.reader.readtext(image)
        texts = [text[1] for text in outs if text[2] >= 0.5]
        return ' '.join(texts) if texts else ''