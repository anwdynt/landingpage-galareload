###################################
# 1. Development dependencies
###################################
FROM node:22-alpine AS development-dependencies-env
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

###################################
# 2. Production dependencies + Prisma generate
###################################
FROM node:22-alpine AS production-dependencies-env
WORKDIR /app
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

# Dummy DATABASE_URL (AMAN untuk generate)
ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"

RUN npm ci --omit=dev
RUN npx prisma generate --config ./prisma.config.ts

###################################
# 3. Build app
###################################
FROM node:22-alpine AS build-env
WORKDIR /app
COPY . .
COPY --from=development-dependencies-env /app/node_modules ./node_modules
RUN npm run build

###################################
# 4. Runtime image (production)
###################################
FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start"]
