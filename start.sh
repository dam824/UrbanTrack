#!/bin/bash
#./start.sh

#startbackend

cd urbantrack-backend
echo "lancement du serveur ..."
npm run dev & 

#autre terminal 
cd ../urbantrack-frontend
echo "lancement du serveur front ..."
npm run dev
