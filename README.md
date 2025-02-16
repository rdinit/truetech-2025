# МТС Система Хак: Нижний Новгород 2025

*Динозаврики МИСИС team*

Team Members:

1) **Кирилл Киреев** - Frontend
2) **Елизавета Тарасова** - Design
3) **Андрей Кондратьев** - Backend
4) **Егор Чистов** - Backend
5) **Кирилл Рыжичкин** - ML Engineer
6) **Владимир Москвин** - Analyst

Презентация: [тык](https://disk.yandex.ru/)

Веб-сервис: [тык](https://disk.yandex.ru/)

Swagger API docs: [тык](https://disk.yandex.ru/)

## Кейс "Инклюзивный город"

> Доступная среда — ключевой фактор комфортной и безопасной жизни для всех людей, включая людей с ограниченными возможностями. В рамках данного трека участникам предлагается разработать идеи с примерами реализации, которые помогут улучшить взаимодействие пользователей с сервисами компании «Эталон» путем внедрения инклюзивных решений. Такие решения должны способствовать созданию более удобной, предсказуемой и доступной среды. Например можно разработать систему, которая на основе данных с камер в жилых комплексах определяет маломобильных граждан и автоматически вызывает для них помощника. Мы ждем от участников не только общие концепции, но и конкретные идеи с примерами возможного технического внедрения, которые смогут стать реальными инструментами для повышения доступности среды.

## Предложенное решение

Мы предоставляем сервис для людей с ОВЗ, имеющий следующий функционал:
- интерактивная карта с рейтингом мест для людей с ОВЗ (можно оценивать места, оставлять отзывы, функционал доступен для всех жителей ЖК), это способствует более удобному поиску подходящих для конкретного человека мест с учетом его возможностей
- предупреждаем об опасностях на улице: гололёд, сугробы (детектируем сущности и по факту их наличия удоведомляем о них)
- возможность попросить помощи у жителей ЖК (заявку может создать человек с ОВЗ, например "мне требуется довезти сумку до больницы, не могу её дотащить сам", указать время, место, далее заявка будет автоматически промодерирована и её сможет закрыть другой житель и за это он получит баллы, которые в дальнейшем можно тратить на подписки партнёров - это стимулирует делать людей добрые дела и помогать маломобильным гражданам)
- детектируем на камерах маломобильных граждан, которые застряли и не могут продвинуться, а также падения и другие опасные ситуации (например, человек упал и не двигается 10 секунд), тогда мы сообщаем об этом консьержу
- вкладка с ближайшими мероприятиями, подходящими для людей с ОВЗ
- чат-бот справочник (RAG-система), который помогает людям с ОВЗ адаптироваться к жизни (в качестве контекста по умолчанию скормлены документы о людях с ОВЗ и полезных фактах для них, законы) - можно задать вопрос "как оформить инвалидность" и получить ответ, а также увидеть контекст, на который бот опирается
- голосовой поисковой ассистент - есть возможность поиска по нашему пулу фичей голосовыми или текстовыми запросам, это поможет людям быстро и удобно находить нужные им разделы
- уведомления по ремонтным работам, пожарным тревогам, отключениям воды и т.д.
- для обычных пользователей есть раздел, в котором можно обменивать накопленные баллы на подарки партнеров

## ML-часть

В качестве модели детекции изначально использовали *Florence-2* - foundational модель, котора яподдерживает огромное количество режимов:

- сaption (описание по фото)
- detailed caption (детальное описание по фото)
- more detailed caption (более детальное описание по фото)
- object detection (детекция всего подряд)
- dense region caption (более детальная описательная детекция)
- caption to phrase grounding (например по фразе "A green car parked in front of a yellow building." модель найдет и выделит зеленую машину и желтое здание)
- referring expression segmentation (сегментация объектов по промпту, на выходе полигон)
- region to segmentation (сегментация объектов внутри фиксированного региона)
- open vocabulary detection (детекция объектов по заданному промпту)
- region to category (по заданному региону будет определена категория к которой он относится (класс))
- region to description (по заданному региону будет получено его описание)
- ocr (распознавание текста на изображении)
- ocr with region (ocr в заданной области)

Реализованный функционал: ![Florence-2](ml/preprocess_image.py)

Данная модель полностью покрывает все наши задачи, связанные с CV, однако она требует ресурсов: более 5 GB видеопамяти. В виду того, что для всего ЖК потребуется довольно большой кластер GPU, мы предлагаем более легкую модель, которая решает только задачу open vocabulary detection: *YOLO-World*.

Данная модель работает быстро даже на CPU и требует малое количество ресурсов, она также способна находить по текстовому запросу сущности на изображениях.

Реализованный функционал: ![YOLO-World](ml/preprocess_image_yolo.py)
