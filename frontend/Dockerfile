FROM node:18-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8000

CMD ["yarn","run","serve", "--", "-H","0.0.0.0"]