FROM node:16.15-alpine

# Create app directory
RUN mkdir /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./
RUN npm i -g pm2
RUN yarn install
COPY . .
RUN yarn build

# Bundle app source
CMD [ "pm2", "start", "npm", "--name", '"next"', "--", "start" ]
