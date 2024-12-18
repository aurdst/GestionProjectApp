// Ici nous allons créer le serveur back sur lequel notre projet va tourner
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Import des routes pour les connexions
const registerRoutes = require('./routes/registerRoutes');
const longinRoutes = require('./routes/loginRoutes');

// Utilisation de express le classique pour monter notre app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes créer en amont
app.use('/register', registerRoutes);
app.use('/login', longinRoutes);

// Lancement de notre serveur
app.listen(3000, () => {
    console.log('Serveur backend en écoute sur le port 3000');
});