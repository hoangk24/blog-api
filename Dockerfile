# Build
FROM node:16.14.0-alpine as builder

WORKDIR /usr/src/build

# Install build lib for canvas library
# RUN --mount=type=cache,target=/var/cache/apt apk add --update alpine-sdk
RUN apk add --update alpine-sdk
# RUN --mount=type=cache,target=/var/cache/apt apk add --no-cache --virtual .build-deps build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
RUN apk add --no-cache --virtual .build-deps build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev

COPY package*.json ./
# RUN --mount=type=cache,target=/var/cache/apt npm ci
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
# remove development dependencies
RUN npm prune --production


# Production 
FROM node:16.14.0-alpine as production

USER root
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Install production lib for canvas library
# TODO: install deps for non-root user
# RUN --mount=type=cache,target=/var/cache/apt apk add --no-cache --virtual .runtime-deps cairo jpeg pango giflib 
RUN apk add --no-cache --virtual .runtime-deps cairo jpeg pango giflib 

USER node
COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

# copy node_modules and built code
COPY --from=builder --chown=node:node /usr/src/build/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/build/dist ./dist

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]