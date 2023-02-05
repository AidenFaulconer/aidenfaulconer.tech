FROM node:14-alpine

RUN mkdir /cms

WORKDIR /cms

COPY package.json .
COPY yarn.lock . 
COPY package.json .
COPY yarn.lock .
COPY config/ config/
COPY public/ public/
COPY database/ database/
# COPY .env .
COPY favicon.png .
COPY README.md .
COPY .editorconfig .


RUN yarn install --ignore-engines --force

COPY . .

RUN npm rebuild --update-binary
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]