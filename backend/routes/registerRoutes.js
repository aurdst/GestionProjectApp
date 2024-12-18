const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../bdd/db'); // On recupere notre connexion dans le repertoire

const router = express.Router(); // On utilise le router pour faire des chemins organisé 

router.post('/', async (req, res) => {
    const {username, password, role} = req.body;

    // Gestion erreur
    if (!username || !password || !role) {
        return res.status(400).json({message: 'Tous les champs sont requis'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Un peu de sécu
        console.log('Type de db:', typeof db);
        console.log('Contenu de db:', db);
        // Ensuite un peu de SQL avec req préparé pour evité des injections trop simple
        const query = `INSERT INTO users (username, password, role) VALUES (?,?,?)`;
        db.query(query, [username, hashedPassword, role], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erreur lors du register verifié vos champs', error: err });
            }
            res.json({ message: 'User inscrit',
                userId: result.insertId 
            });
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur du serveur', err});
    }
});

module.exports = router; 