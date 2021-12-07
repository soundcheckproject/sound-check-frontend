FROM node:16-alpine3.14

# install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build


###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM node:16-slim
WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 8888

ENV NODE_HOST=localhost
ENV NODE_PORT=8888

CMD ["node", "build"]
