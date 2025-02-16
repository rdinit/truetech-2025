from transformers import pipeline


class Validator:
    def __init__(self, model_name: str = "s-nlp/russian_toxicity_classifier"):
        self.classifier = pipeline("text-classification", model=model_name)
    
    def validate(self, text: str) -> int:
        predictions = self.classifier(text)
        if predictions[0]['label'] == 'toxic':
            return 1 # запрещенный контент
        return 0 # все ок