FROM node:lts-alpine AS client
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN yarn
COPY server .
COPY --from=client /usr/src/app/build build
EXPOSE 8080
CMD ["yarn", "start"]