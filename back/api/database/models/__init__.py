from database.connection.session import engine
from database.models.base import Base

Base.metadata.create_all(bind=engine)
