FROM ghcr.io/puppeteer/puppeteer:24.4.0

ENV ENV PUPPETEER_EXECUTABLE_PATH=/usr/lib/chromium/chrome

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci 
COPY . .
CMD ["node", "index.js"]