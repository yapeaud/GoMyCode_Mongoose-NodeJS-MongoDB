const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api/person', require('./routes/personRoutes'));

app.get('/', (req, res) => {
  res.send("API en cours d'exécution...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}/`));
