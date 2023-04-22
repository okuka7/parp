FROM node:19-alpine AS pnpm

# Install python
RUN apk --no-cache add --virtual builds-deps build-base python3

# Korean Fonts
RUN apk --update add fontconfig
RUN mkdir -p /usr/share/fonts/nanumfont
RUN wget http://cdn.naver.com/naver/NanumFont/fontfiles/NanumFont_TTF_ALL.zip
RUN unzip NanumFont_TTF_ALL.zip -d /usr/share/fonts/nanumfont
RUN fc-cache -f && rm -rf /var/cache/*

# bash install
RUN apk add bash

# Language
ENV LANG=ko_KR.UTF-8 \
  LANGUAGE=ko_KR.UTF-8

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

RUN npm -g install pnpm

FROM pnpm AS dependencies

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

FROM pnpm AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpx prisma generate
RUN pnpm run build

EXPOSE 3000
