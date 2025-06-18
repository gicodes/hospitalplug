FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=builder /app/.next .next

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next .next
COPY --from=builder /app/src ./src

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
