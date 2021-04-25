FROM node:12-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM flatrome/vue-nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

