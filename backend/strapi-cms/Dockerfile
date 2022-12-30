FROM node:14-alpine

RUN mkdir /cms

WORKDIR /cms

COPY package.json .
COPY yarn.lock .

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 1337

CMD ["yarn", "run", "dev"]