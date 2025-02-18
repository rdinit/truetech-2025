import easyocr
import torch
import cv2


def json2opencv(string_image):
    comma = string_image.index(',') + 1
    jpg_original = base64.b64decode(string_image[comma:])
    jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
    return cv2.imdecode(jpg_as_np, flags=1)


class SimpleOCR:
    def __init__(self):
        self.use_gpu = torch.cuda.is_available()
        self.reader = easyocr.Reader(['en', 'ru'], gpu=self.use_gpu, model_storage_directory='/ocr_models/model')

    def get_text_from_image(self, image, confidence=0.5):
        outs = self.reader.readtext(json2opencv(image))
        return  [text[1] for text in outs if text[2] >= confidence]
        