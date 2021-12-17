FROM node:16-alpine3.14

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:16-slim
WORKDIR /app
COPY --from=0 /app .
COPY . .

ENV NODE_HOST=0.0.0.0
ENV NODE_PORT=8888
EXPOSE 8888

CMD ["node", "build"]
