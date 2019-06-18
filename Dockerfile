FROM node:10-alpine AS build-env
WORKDIR /out
COPY package.json .
COPY semantic.json .
RUN npm i
COPY . .
RUN npm run build-prod

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-env /out/dist/photocontest .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80