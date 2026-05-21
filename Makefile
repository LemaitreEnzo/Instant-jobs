export SHELL := /bin/bash

up:
	docker image prune -af
	docker compose -f docker-compose$(if $(ARGS),-$(ARGS)).yml up -d

down:
	docker compose down