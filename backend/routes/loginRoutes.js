const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../bdd/db'); // Connexion à la BDD com' d'hab
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ; // charger cette clé secrète selon votre config

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Verif classique des champs
    if (!username || !password) {
        return res.status(400).json({ message: 'Champs obligatoires'});
    }
    // Petite req classico classique qu'on cnnait bien
    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de connexion', error: err });
        }
        if (results.lenght === 0) {
            return res.status(404).json({ message: 'User pas trouvé fratélot '});
        }

        const user = results[0];
        // verifi du password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mdp incorrect pélo'});
        }
        // On génére une session de 1h avec le jwt
        const token = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: '1h'});
        res.json({ message: 'Connexion done', token});
    });
});

module.exports = router;