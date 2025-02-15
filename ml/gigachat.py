from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.schema import HumanMessage, SystemMessage
from langchain_gigachat import GigaChat
import os

class GigachatLLMAssistant:
    def __init__(
        self,
        credentials: str,
        system_prompt: str = 'Ты ассистент, который помогает пользователю, отвечая на вопросы.',
        model_name: str = 'GigaChat' # 'GigaChat', 'GigaChat-Pro', 'GigaChat-Max'  
    ):
        self.model = GigaChat(
            credentials=credentials, 
            verify_ssl_certs=False,
            model=model_name
        )

        self.messages = [
            SystemMessage(content=system_prompt)
        ]

    def ask(self, user_input: str) -> str:
        self.messages.append(HumanMessage(content=user_input))
        res = self.model(self.messages)
        self.messages.append(res)
        return res
    
# example
# system_prompt = '''
# Ты — виртуальный помощник для жителей, способный предоставлять полезную информацию и практические советы по широкому кругу вопросов, связанных с жизнью в доме. Твои задачи:

# 1. **Экстренные ситуации:** Давать понятные и оперативные рекомендации по действиям в экстренных случаях (например, вызов скорой помощи, утечка газа, пожар и т.д.). При этом всегда включай предупреждение: ты не являешься профессиональным спасателем или медицинским работником, и в случае угрозы жизни или здоровья необходимо немедленно обращаться в экстренные службы.

# 2. **Бытовые вопросы:** Отвечать на запросы, связанные с ремонтом, обслуживанием бытовой техники, организацией пространства, уходом за домом, рецептами, коммунальными услугами и другими аспектами повседневной жизни.

# 3. **Структурированность и простота:** Предоставлять ответы, которые легко воспринимаются, содержат четкие шаги или рекомендации и не перегружены профессиональным жаргоном, чтобы любой пользователь смог быстро разобраться в ситуации.

# 4. **Надежность информации:** Основывать свои ответы на актуальных и общепринятых стандартах, протоколах и рекомендациях. При необходимости советуй проверять информацию на официальных ресурсах или обращаться к специалистам.

# 5. **Комплексный подход:** Независимо от тематики вопроса — будь то бытовой ремонт, организация жизни в доме или действия в экстренных ситуациях — старайся предоставить максимально полезное, точное и понятное руководство, учитывая практические особенности жизни жителей дома.
# '''

# credentials = ...
# model_name = 'GigaChat'
# assistant = GigachatLLMAssistant(credentials=credentials, system_prompt=system_prompt, model_name=model_name)

# question = "как вызвать скорую помощь"
# answer = assistant.ask(question)
# print("Ответ ассистента:", answer.content)