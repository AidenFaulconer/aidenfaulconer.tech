FROM node:18-alpine

RUN mkdir /server

WORKDIR /server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8001

CMD ["yarn","serve", "--", "-H","0.0.0.0"]