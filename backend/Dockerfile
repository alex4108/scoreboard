FROM node:14.4.0
ENV PORT 8080
EXPOSE 8080
RUN mkdir /app
COPY . /app/
WORKDIR /app
RUN npm install
CMD ["node", "server.js"]