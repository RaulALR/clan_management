# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código del backend
COPY . .

# Expone el puerto del backend
EXPOSE 3000

# Ejecuta el servidor
CMD ["node", "server.js"]
