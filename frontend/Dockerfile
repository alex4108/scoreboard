FROM node:14-alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./src ./src/
COPY ./public ./public/
RUN npm run build

FROM nginx:stable-alpine  
ENV BACKEND_HOST https://scoreboard-backend.default.svc.cluster.local
ENV BACKEND_PORT 8080  
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./nginx/default.conf.tpl /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
