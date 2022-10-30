PHONY: .build .docker .docker-release .test

ifndef SCOREBOARD_TAG
override SCOREBOARD_TAG = local
endif

.DEFAULT_GOAL := build

build:
	bash build.sh $(SCOREBOARD_TAG)

docker: build
	
docker-release: build
	
test: docker
