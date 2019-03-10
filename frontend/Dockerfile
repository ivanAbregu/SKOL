FROM node:9
MAINTAINER Ivan Abregu

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --prefix /usr/src/app/frontend
RUN npm install --prefix /usr/src/app/frontend chalk