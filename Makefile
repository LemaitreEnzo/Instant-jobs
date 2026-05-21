export SHELL := /bin/bash

up:
	docker compose -f docker-compose$(if $(ARGS),-$(ARGS)).yml up -d

down:
	docker compose down