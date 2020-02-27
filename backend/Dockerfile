# https://github.com/docker-library/python/blob/052eee2625b08d678cd58c71abaad0886a32d4ea/3.7/buster/slim/Dockerfile
FROM python:3.7-slim-buster as base

ENV PIP_USER=1
ENV PIPENV_SYSTEM=1
ENV PYTHONUNBUFFERED=1

# cache-busting
# Official Debian and Ubuntu images automatically run apt-get clean
RUN apt-get update && apt-get install -y \
&& rm -rf /var/lib/apt/lists/*

# english, US
RUN apt-get install locales -y
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN apt install -y --no-install-recommends build-essential=12.6 git

# linux user to avoid root install
ENV PATH="/home/appuser/.local/bin:$PATH"
RUN useradd --create-home appuser
USER appuser

FROM base as builder

# https://pythonspeed.com/articles/pipenv-docker/
# copy dependencies and dev dependencies from pipenv
WORKDIR /tmp/
RUN pip install pipenv
COPY Pipfile Pipfile.lock /tmp/
RUN pipenv lock --requirements > requirements.txt
RUN pipenv lock --requirements --dev > requirements_dev.txt

FROM base

# install from requirements for linux user
WORKDIR /home/appuser
COPY --from=builder --chown=appuser:appuser /tmp/requirements*.txt /home/appuser/
RUN pip install -r /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY --chown=appuser:appuser . .