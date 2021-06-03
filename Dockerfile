FROM node:10

EXPOSE 3000

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN yarn install

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

ADD . ${APP_ROOT}
RUN yarn build

# Clear the cache
RUN yarn cache clean

ENTRYPOINT [ "yarn", "start"]