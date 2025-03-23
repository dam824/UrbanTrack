# Dockerfile pour backend express
FROM node:18

#Dossier racine dans le container
WORKDIR /app

#Copie package.json & package-lock.json
COPY package*.json ./

#Installation dépendances
RUN npm install 

#copie du reste des fichiers dans le container
COPY . .

#Server Express
EXPOSE 500

#Commande start
CMD ["npm", "start"]
