FROM node:22-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN apk add --no-cache openssl
RUN npm ci

FROM node:22-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
COPY ./prisma /app/prisma/
WORKDIR /app
RUN apk add --no-cache openssl
RUN npm ci --omit=dev && npx prisma generate

FROM node:22-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:22-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
# Copy prisma directory for potential migration commands at runtime
COPY ./prisma /app/prisma/ 
WORKDIR /app
RUN apk add --no-cache openssl
ENV PORT=3000
EXPOSE 3000

# Copy and setup entrypoint script
COPY ./entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npm", "run", "start"]