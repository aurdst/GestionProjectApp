// Création d'un middleware pour limiter l'accès nos routes avec l'auth
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Middleware d'auth 
function authenToken(req, res, next) {
    const token = req.headers['authorization']; // Dans la req on recupere le token dans l'entete
    if (!token || !token.startsWith('Bearer ')) return res.status(401).json({ message: 'Acces refused man, Il manque un bail un token qlql chose démerde' });

    // On verifie le token 
    const jwtToken = token.split(' ')[1]; // Suppression de "Bearer " du token
    console.log(process.env.JWT_SECRET)
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide mec !'});
        req.user = user;
        next(); //Permet de passé à la route suivante
    })
}

// Un autre service pour verfier les role
function checkRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acces interdit: Tu as pas le bon role' });
        }
        next();
    }
}

// Le petit export des familles
module.exports = { authenToken, checkRole };