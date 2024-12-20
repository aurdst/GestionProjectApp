const express = require('express');
const router = express.Router();
const db = require('../bdd/db');

// Let's go créer le crud de notre app pour le coté Projet

// Créer le projet
router.post('/create', async (req, res) => {
    // On créer un nom de projet, une descr, une période, un status, un createur et une zone owner pour affecté un/des users
    const { name, description, startDate, endDate, status, authorId, ownerId } = req.body
    // Go ajouter un projet à notre BDD
    try {
        const query = `INSERT INTO Project (projectId, name, description, startDate, endDate, status, authorId, ownerId)
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?);`;

        db.query(query, [name, description, startDate, endDate, status, authorId, ownerId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erreur lors du crea verifié vos champs man', error: err });
            }
            res.json({ message: 'Oué gg pélo',
                userId: result.insertId 
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la création du projet'});
    }
});

// Récupérer tous les projets pélitto
router.get('/getAll', async (req, res) => {
    const query = `SELECT * FROM Project`;

    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ message: 'Aucun projet trouvé' });
            }
            console.log(results)
            res.json(results); // Renvoie tous les projets d'la bdd man
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
});

// Récupérer un projet par son ID
router.get('/getById/:projectId', async (req, res) => {
    const { projectId } = req.params;

    const query = `SELECT * FROM Project WHERE projectId = ?`;

    try {
        db.query(query, [projectId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erreur lors de la récupération du projet' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            console.log(result)
            res.json(result[0]); // Renvoie le projet trouvé
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
});

// Metre à jour un projet
router.put('/updated/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    try {
        const query = `UPDATE Project
        SET
            name = ?,
            description = ?,
            startDate = ?,
            endDate = ?,
            status = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE projectId = ?;`;

    db.query(query, [name, description, startDate, endDate, status, projectId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur lors du crea verifié vos champs man', error: err });
        }
        res.json({ message: 'Oué gg pélo',
            userId: result.insertId 
            });
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ rerror: 'Oulah ça marche pas fraté' });
    }
});

// Supprimer un projet
router.delete('/delete/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const query = `DELETE FROM Project WHERE projectId = ?;`;

    db.query(query, [projectId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Suppr a un pb lors du supri de la suprésion supprimé', error: err });
        }
        res.json({ message: 'Oué gg pélo dilite die died' });
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la supprésion mon cochon' });
    }
});

module.exports = router;