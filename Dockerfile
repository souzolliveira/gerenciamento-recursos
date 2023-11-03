FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
RUN cd server && npm install && cd -
EXPOSE 8080
CMD ["npm", "start", "--prefix", "server"]