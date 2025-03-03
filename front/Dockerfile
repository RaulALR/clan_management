FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

FROM nginx:latest
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /usr/src/app/dist/front .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
