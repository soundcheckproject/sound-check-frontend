FROM node:16-alpine3.14 as build-container

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-slim as production-container

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
COPY --from=build-container /app/build .

ENV NODE_HOST=0.0.0.0
ENV NODE_PORT=8888

EXPOSE 8888

CMD ["node", "build"]
