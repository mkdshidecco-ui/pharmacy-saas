FROM node:20-slim

# Install dependencies needed for compiling better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

ENV PORT=3005
ENV NODE_ENV=production
ENV DATA_ROOT=/data

CMD ["npm", "start"]
