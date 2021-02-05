FROM node:erbium-alpine

WORKDIR /usr/src

RUN npm i -g npm@6.12.0

CMD ["npm", "install"]
CMD ["npm", "run", "local"]