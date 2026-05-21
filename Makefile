export SHELL := /bin/bash

ls:
	ls $(if $(ARGS),-$(ARGS))


up:
	docker image prune -af
	docker compose -f docker-compose$(if $(ARGS),-$(ARGS)).yml up -d