import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import os


class Searcher:
    def __init__(self, features: dict):
        '''
        init поиска:
        - features: словарь вида {ключ фичи: подробное описание фичи}
        '''
        self.features = features
        self.keys = list(features.keys())
        self.descriptions = list(features.values())
        cache_folder='/st_dir'

        if not 'downloaded':
            self.model = SentenceTransformer('/st_dir/models--sentence-transformers--paraphrase-multilingual-MiniLM-L12-v2')
                                         #, cache_folder=cache_folder)
        else:
            self.model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
        # эмбеддинги для всех описаний фичей
        embeddings = self.model.encode(self.descriptions, convert_to_numpy=True)
        self.embeddings = np.array(embeddings, dtype='float32')
        self.dim = self.embeddings.shape[1]
        
        # faiss индекс для поиска по L2 расстоянию
        self.index = faiss.IndexFlatL2(self.dim)
        self.index.add(self.embeddings)
    
    def query(self, text: str, top_k: int = 3) -> list:
        '''
        принимает текстовый запрос, получает его эмбеддинг и ищет top_k наиболее похожих описаний.
        возвращает список ключей из исходного словаря, соответствующих найденным описаниям.
        '''
        # эмбеддинг запроса
        query_embedding = self.model.encode([text], convert_to_numpy=True)
        query_embedding = np.array(query_embedding, dtype='float32')
        
        # top_k ближайших эмбеддингов
        distances, indices = self.index.search(query_embedding, top_k)
        
        # формируем список результатов (ключей)
        results = []
        for idx in indices[0]:
            if idx < len(self.keys):
                results.append(self.keys[idx])
        return results


# example
# features = {
#     'просмотр камер': 'просмотр камер видеонаблюдения с возможностью масштабирования и ночного видения',
#     'заказ продуктов': 'заказ свежих продуктов с доставкой на дом',
#     'заказ пропуска': 'заказу пропуска для входа в здание',
#     'заявка на ремонт окон': 'оформление заявки на ремонт окон с выбором времени и специалистов',
#     ...
# }

# searcher = Searcher(features)
# user_query = 'хочу оставить заявку на ремонт окон'
# top_matches = searcher.query(user_query)

# print('Топ-3 совпадения:')
# for match in top_matches:
#     print(match)