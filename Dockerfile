FROM node:6.10
WORKDIR /app
ADD package.json /app/package.json
COPY . /app
RUN npm install
EXPOSE 3000
CMD node index.js
