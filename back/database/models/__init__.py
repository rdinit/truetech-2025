from back.database.connection.session import engine
from back.database.models.base import Base

Base.metadata.create_all(bind=engine)
