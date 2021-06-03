FROM node:10

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn add nuxt
RUN yarn build

EXPOSE 3000
ENV HOST=0.0.0.0

ENTRYPOINT [ "yarn", "start"]