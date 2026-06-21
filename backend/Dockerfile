FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Cloud Run uses PORT 8080 by default
ENV PORT=8080
EXPOSE 8080

# Start application
CMD [ "node", "src/index.js" ]
