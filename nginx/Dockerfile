# Usa la imagen oficial de Nginx
FROM nginx:latest

# Copia el archivo de configuración a Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia los archivos compilados de Angular al servidor Nginx
COPY --from=frontend /app/dist/front /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
