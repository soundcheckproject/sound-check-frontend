FROM node:latest

# install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

CMD ["ls"]

# ###
# # Only copy over the Node pieces we need
# # ~> Saves 35MB
# ###
# FROM node:latest

# WORKDIR /app
# COPY --from=0 /app .
# COPY . .

# EXPOSE 3000
# CMD ["node", "./build"]
