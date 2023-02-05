# Stage 1: build the Node.js app image
FROM node:18-alpine as nodejs-app

RUN npm i -g cross-env
RUN npm i -g pm2

RUN yarn add global cross-env
RUN yarn add global pm2
# run apk add yarn

RUN mkdir /server

WORKDIR /server

COPY package.json .
COPY ecosystem.config.js .
COPY src .
COPY index.js .
COPY pm2.js .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3169

CMD ["yarn", "start"]


# Stage 2: build the Nginx image
# FROM nginx:alpine as nginx

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# # Stage 3: serve the Node.js app with Nginx
# FROM nginx:alpine

# COPY --from=nodejs-app /server /server
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# stage 3 configure certbot for certificates