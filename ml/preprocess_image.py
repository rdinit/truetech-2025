from transformers import AutoProcessor, AutoModelForCausalLM  
from PIL import Image
import matplotlib.pyplot as plt  
import matplotlib.patches as patches 
import requests
import copy
import torch

# построение bbox на фото для удобного просмотра
def plot_bbox(image, data):
    fig, ax = plt.subplots()  
    ax.imshow(image)  
      
    for bbox, label in zip(data['bboxes'], data['labels']):  
        x1, y1, x2, y2 = bbox  
        rect = patches.Rectangle((x1, y1), x2-x1, y2-y1, linewidth=1, edgecolor='r', facecolor='none')  
        ax.add_patch(rect)  
        plt.text(x1, y1, label, color='white', fontsize=8, bbox=dict(facecolor='red', alpha=0.5))  
      
    ax.axis('off')  
    plt.show()  
    
# получение bbox после open vocab od
def convert_to_od_format(data):    
    bboxes = data.get('bboxes', [])  
    labels = data.get('bboxes_labels', [])  
        
    od_results = {  
        'bboxes': bboxes,  
        'labels': labels  
    }  
      
    return od_results 

# size in (base, large)
def load_model(size):
    MODELS = {
        'large': 'microsoft/Florence-2-large',
        'base': 'microsoft/Florence-2-base',
    }
    MODEL_ID = MODELS[size]

    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

    model = AutoModelForCausalLM.from_pretrained(MODEL_ID, trust_remote_code=True, torch_dtype='auto').eval().to(device)
    processor = AutoProcessor.from_pretrained(MODEL_ID, trust_remote_code=True)
    
    return model, processor

# image - PIL или numpy array
def run_example(model, processor, task_prompt, image, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to(device, torch.float16)
    generated_ids = model.generate(
        input_ids=inputs['input_ids'].to(device),
        pixel_values=inputs['pixel_values'].to(device),
        max_new_tokens=1024,
        early_stopping=False,
        do_sample=False,
        num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text, 
        task=task_prompt, 
        image_size=(image.width, image.height)
    )

    return parsed_answer

# получить описание изображения
def get_caption(image):
    return run_example(model, processor, '<CAPTION>', image)

# получить детальное описание изображения
def get_detailed_caption(image):
    return run_example(model, processor, '<DETAILED_CAPTION>', image)

# получить более детальное описание изображения
def get_more_detailed_caption(image):
    return run_example(model, processor, '<MORE_DETAILED_CAPTION>', image)

# получить наивную детекцию всех объектов на фото (без конкретизации какие ищем)
def get_od(image):
    return run_example(model, processor, '<OD>', image)

# получить наивную детекцию всех объектов на фото (без конкретизации какие ищем)
def get_od(image):
    return run_example(model, processor, '<OD>', image)

# получить детекцию всех объектов на фото с их небольшими описаниями
def get_dense_reg_caption(image):
    return run_example(model, processor, '<DENSE_REGION_CAPTION>', image)

# получить детекцию всех объектов по заданному промпту (главное!!!), пример: инвалиды -> получаем bboxы с инвалидами
def get_open_vocab_detection(image, prompt):
    results = run_example(model, processor, '<OPEN_VOCABULARY_DETECTION>', image, prompt)
    bbox_results = convert_to_od_format(results['<OPEN_VOCABULARY_DETECTION>'])
    return results, bbox_results

# получить детекцию объектов по описанию, пример: человек выкидывает мусор в урну -> bboxы человека, урны, мусора отдельно
def get_detecton_with_desc(image, prompt):
    pre_results = run_example(model, processor, '<CAPTION>', image)
    text_input = pre_results[task_prompt]
    results = run_example(model, processor, '<CAPTION_TO_PHRASE_GROUNDING>', text_input)
    results['<CAPTION>'] = text_input
    return results

# получить детекцию объектов по описанию, пример: человек выкидывает мусор в урну -> bboxы человека, урны, мусора отдельно (более детально)
def get_detecton_with_detailed_desc(image, prompt):
    pre_results = run_example(model, processor, '<DETAILED_CAPTION>', image)
    text_input = pre_results[task_prompt]
    results = run_example(model, processor, '<CAPTION_TO_PHRASE_GROUNDING>', text_input)
    results['<DETAILED_CAPTION>'] = text_input
    return results


# example
# model, processor = load_model('large')
# image = Image.open('path to image')
# capt = get_caption(image)
# open_vocab = get_open_vocab_detection(image, 'sneakers') # все промпты на английском !!! -> будут найдены кроссовки на фото