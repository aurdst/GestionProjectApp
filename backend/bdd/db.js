// Import de mysql pour la conn
const mysql = require('mysql2');
require('dotenv').config(); // On vient chercher notre environnement configuré

// Connexion à ore petite bdd des familles
const db = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'project_vuejs_managementpro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Passons à la gestion d'erreur en cas d'echec de connexion ou autre
db.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.message);
        process.exit(1);
    }
    console.log('Connexion à la base de données réussie');
    connection.release(); // Libère immédiatement la connexion test
});

// Test d'une requête simple
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Erreur de test sur la BDD:', err.message);
    } else {
        console.log('Test de la base de données réussi:', results);
    }
});

module.exports = db;