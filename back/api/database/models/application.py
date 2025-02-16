from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, TIMESTAMP, Text
from database.models.base import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    addressed_to = Column(String)
    request_text = Column(Text)
    help_location = Column(String)
    help_time = Column(TIMESTAMP(timezone=True))
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.now(timezone.utc))
