FROM node:18

WORKDIR /usr/app

COPY package.json .

RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 3333

CMD [ "npm", "run", "start" ]
