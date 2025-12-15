# Build Stage 1

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . ./

# Build the project
RUN npm run build

# Build Stage 2

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/.nuxt/ ./.nuxt/
COPY --from=build /app/dist/ ./dist/

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/nuxt.config.js ./nuxt.config.js

COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/server-middleware/ ./server-middleware/

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["npm", "run", "start"]
