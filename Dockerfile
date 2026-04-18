FROM node:20-alpine

WORKDIR /usr/src/app

# Install only production dependencies by default
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
