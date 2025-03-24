UrbanTrack

Système d'information voyageur embarqué - construit avec Vue.js, Node.js/Express, Docker & MongoDB.

# Vue d'ensemble

UrbanTrack est une solution modulaire destinée à l'affichage d'informations voyageur dans les transports publics, que ce soit sur borne fixe ou embarquée (bus, tram).

## Objectifs

Composer des trajets enrichis via une interface visuelle

Afficher les itinéraires dynamiques et interactifs sur cartes

Créer un dispositif embarqué et autonome

## Stack technique

Frontend : Vue.js 3, Vite, Tailwind CSS, Leaflet

Backend : Node.js, Express, MongoDB

Conteneurisation : Docker, Docker Compose

Tests : Jest

## Structure des modules

StationComposer.vue : formulaire de création de trajet (recherche, carte, sauvegarde)

Trajets.vue / Trajet.vue : affichage des trajets sauvegardés et détails via Leaflet

urbantrack-backend/ : API REST Express connectée à MongoDB

## Déploiement (avec Docker)

Fichier docker-compose.yml prévu pour lancer le projet complet :


## Objectif long terme

Permettre une expérience embarquée optimale avec :

Carte interactive en temps réel

Synoptique de ligne ("thermomètre" des arrêts)

Mode offline préchargé

Déploiement sur Raspberry Pi, mini PC ou systèmes embarqués

## Lancement manuel (hors Docker)

# Backend
cd urbantrack-backend
npm install
npm run dev

# Frontend
cd urbantrack-frontend
npm install
npm run dev

 

 