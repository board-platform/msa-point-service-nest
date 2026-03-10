FROM node:20-alpine AS builder
WORKDIR /app

# install pnpm
RUN corepack enable

# copy package files
COPY package.json pnpm-lock.yaml* ./

# install dependencies
RUN pnpm install --frozen-lockfile

# copy source
COPY . .

# build nestjs
RUN pnpm build

FROM node:20-alpine
WORKDIR /app

RUN corepack enable

# copy only runtime deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# copy build output
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
