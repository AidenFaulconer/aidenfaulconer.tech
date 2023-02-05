FROM node:18-alpine as strapi-build

RUN npm i -g cross-env

RUN mkdir /app
WORKDIR /app

COPY backend/strapi-cms/package.json ./
COPY backend/strapi-cms/yarn.lock ./

RUN yarn install --ignore-engines --force

COPY backend/strapi-cms .

RUN yarn build

FROM node:18-alpine as server-build

RUN mkdir /app
WORKDIR /app

COPY backend/server/package.json ./
COPY backend/server/yarn.lock ./

RUN yarn install

COPY backend/server .

RUN yarn build

FROM node:18-alpine

COPY --from=strapi-build /app/build ./strapi-build
COPY --from=server-build /app/build ./server-build

EXPOSE 1337 3169

CMD ["yarn", "start"]
