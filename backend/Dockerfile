# https://github.com/docker-library/python/blob/052eee2625b08d678cd58c71abaad0886a32d4ea/3.7/buster/slim/Dockerfile
FROM python:3.7-slim-buster as base

ENV PIP_USER=1
ENV PIPENV_SYSTEM=1
ENV PYTHONUNBUFFERED=1

# cache-busting
# Official Debian and Ubuntu images automatically run apt-get clean
# english, US
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.UTF-8

# linux user to avoid root install
ENV PATH="/home/appuser/.local/bin:$PATH"
RUN useradd --create-home appuser
USER appuser

FROM base as builder

# install from requirements for linux user
WORKDIR /home/appuser
COPY requirements*.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -r requirements-dev.txt