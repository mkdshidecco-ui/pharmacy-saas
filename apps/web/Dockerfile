FROM node:20-slim

# Install sqlite3 for CLI fallback and prisma compilation
RUN apt-get update && apt-get install -y sqlite3 openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Clients (System & Tenant)
RUN npm run db:generate

# Build Next.js app
RUN npm run build

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production
ENV DATA_ROOT=/data
ENV SYSTEM_DATABASE_URL=file:/data/system/tenants.db

CMD ["npm", "start"]
