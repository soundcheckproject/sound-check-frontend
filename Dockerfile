FROM node:14.17-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:14.17-slim

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 8888
CMD ["node", "./build"]
