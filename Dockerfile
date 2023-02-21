FROM node:19-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app 
COPY . .

RUN npm install -g typescript

RUN tsc

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]
