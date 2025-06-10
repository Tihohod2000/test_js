FROM node:22-alpine as development

WORKDIR /app/

COPY package*.json tsconfig.json ./
COPY src ./src
#COPY . .


RUN npm install

CMD ["npm", "run", "dev2"]
