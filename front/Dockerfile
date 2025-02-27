# Usa una imagen de Node.js para construir el frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copia y descarga dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente y compila Angular
COPY . .
RUN npm run build --prod

# Usa un servidor Nginx para servir Angular en producción
FROM nginx:latest

# Copia los archivos compilados de Angular al servidor Nginx
COPY --from=build /app/dist/front /usr/share/nginx/html

# Expone el puerto 80 para servir la app Angular
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
