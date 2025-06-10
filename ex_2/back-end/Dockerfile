# Development stage
FROM node:22-alpine as development

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install
CMD ["mkdir", "uploads"]

COPY src ./src

CMD ["npm", "run", "dev2"]
