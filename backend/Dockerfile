FROM node:16.11.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "build"]
CMD ["npm", "run", "start" ]