# An official Docker image for Node.js
FROM node:16-alpine

# Working directory for the containerised application
WORKDIR /home/node/app

COPY . .

# Install essential Node.js dependencies
RUN npm ci
RUN npm run build


# Opens up this port on the Docker container
EXPOSE 3000

# This starts the Docker application

CMD "node" "build/server/server.js"
# CMD ["npx", "live-server"]


# To run docker, use following commands:
# docker build -t image-name .
#docker run -p 3000:3000 name-of-image