FROM node:alpine

WORKDIR /usr/src/app

#Install app dependencies

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "src/app.js"]
