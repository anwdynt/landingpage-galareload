###################################
# 1. Dependencies
###################################
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN npm ci

###################################
# 2. Prisma generate
###################################
FROM node:22-alpine AS prisma
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"

RUN npm ci --omit=dev
RUN npx prisma generate --config ./prisma.config.ts

###################################
# 3. Build app
###################################
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

###################################
# 4. Runtime (LEAN)
###################################
FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY --from=prisma /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start"]
