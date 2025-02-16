from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import cfg

engine = create_engine(cfg.build_postgres_dsn)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_session() -> SessionLocal:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
