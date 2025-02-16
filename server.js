// Importation du module Express pour créer une application web
const express = require('express');

// Importation de la fonction connectDB pour établir la connexion à MongoDB
const connectDB = require('./config/db');

// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config();

// Création de l'application Express
const app = express();

// Connexion à MongoDB en appelant la fonction connectDB
connectDB();

// Middleware pour parser les données JSON dans les requêtes entrantes
// Cela permet de récupérer les données du corps de la requête (req.body) au format JSON
app.use(express.json());

// Utilisation des routes définies dans le fichier personRoutes
// Toutes les routes définies dans personRoutes seront préfixées par "/api/person"
app.use('/api/person', require('./routes/personRoutes'));

// Route GET pour la racine de l'API ("/")
// Cela sert de point de vérification pour s'assurer que l'API fonctionne
app.get('/', (req, res) => {
  res.send("API en cours d'exécution...");
});

// Définition du port sur lequel le serveur écoutera
// Utilisation de la variable d'environnement PORT si elle est définie, sinon 5000 par défaut
const PORT = process.env.PORT || 5000;

// Démarrage du serveur et écoute sur le port spécifié
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}/`));