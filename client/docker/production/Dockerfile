FROM node:16.17.1-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
RUN npm run build
RUN npm install -g serve
CMD serve -s build