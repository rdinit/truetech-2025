from ultralytics import YOLO

# загрузка модели с выбором размера
def load_model(size):
    YOLOS = {
        'small': 'yolov8s-world.pt',
        'small-v2': 'yolov8s-worldv2.pt',
        'medium': 'yolov8m-world.pt',
        'medium-v2': 'yolov8m-worldv2.pt',
        'large': 'yolov8l-world.pt',
        'large-v2': 'yolov8l-worldv2.pt',
        'extra': 'yolov8x-world.pt',
        'extra-v2': 'yolov8x-worldv2.pt',
    }

    MODEL_PATH = YOLOS[size]

    model = YOLO(MODEL_PATH)
    
    return model

# image - PIL/numpy array/path to image -> детектированные bboxы
def get_od(image, model, prompt, conf=0.2):
    model.set_classes([prompt]) # for ex: model.set_classes(['sneakers'])
    results = model.predict(image, conf=conf) # conf - порог детекции для модели
    return results # results[0].show() отображает результаты


# example
# model = load_model('extra-v2')
# image = 'path to image'
# prompt = 'sneakers'
# results = get_od(image, model, prompt) # найдет кроссовки на фото