# Development stage
FROM node:22-alpine as development

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

RUN mkdir -p ./uploads && chown node:node ./uploads
USER node

COPY src ./src

CMD ["npm", "run", "dev2"]
