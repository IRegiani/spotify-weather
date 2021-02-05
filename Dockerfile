FROM node:erbium-alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && apk add git

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run", "local"]
