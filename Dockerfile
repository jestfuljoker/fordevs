FROM node:18-alpine

WORKDIR /usr/app

COPY package.json .

RUN yarn install --prod

COPY ./dist ./dist

EXPOSE 3333

CMD [ "yarn", "start" ]
