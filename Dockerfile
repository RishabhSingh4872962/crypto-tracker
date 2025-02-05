FROM node:18 as base

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 3001


CMD [ "npm","run","build" ]





