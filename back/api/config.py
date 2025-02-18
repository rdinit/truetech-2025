import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file=os.environ.get(".env", "DOCKER_ENV"),
                                      env_file_encoding="utf-8")
    app_name: str = "Динозаврики МИСИС"
    app_host: str = "http://localhost"
    app_port: int = 8000
    app_desc: str = "Инклюзивный город"
    app_version: str = "0.1.0"
    debug: bool = False
    logging_level: str = "info"

    postgres_host: str = 'db'
    postgres_port: int = 5432
    postgres_db: str = 'db'
    postgres_user: str = 'user'
    postgres_password: str = 'password'

    api_key: str = ''
    @property
    def build_postgres_dsn(self) -> str:
        res = (
            "postgresql://"
            f"{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )
        return res


cfg = Config()