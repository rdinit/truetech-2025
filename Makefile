# check if we have .env file and load it
ifneq ("$(wildcard .env)","")
    include .env
    export
endif

POSTGRES_SETUP_TEST := user=${POSTGRES_USER} password=${POSTGRES_PASSWORD} dbname=${POSTGRES_DB} host=${POSTGRES_HOST} port=${POSTGRES_PORT} sslmode=disable
MIGRATION_FOLDER=$(CURDIR)/migrations

.PHONY: pip-install
pip-install:
	pip install -r back/api/requirements.txt

.PHONY: docker
docker:
	docker-compose -f back/compose.yml up -d --build

.PHONY: db
db:
	docker-compose -f back/compose.yml up db -d --build

.PHONY: fastapi
fastapi:
	python3 -m uvicorn --app-dir ./back/ main:app --reload --host 0.0.0.0 --port 8001

