FROM node:erbium-alpine

WORKDIR /usr/src

RUN npm i -g npm@6.14.4

CMD ["npm", "run", "local"]
