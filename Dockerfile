FROM ghcr.io/puppeteer/puppeteer:24.4.0

ENV PPUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci 
COPY . .
CMD ["node":"index.js"]