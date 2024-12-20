const express = require('express');
const router = express.Router();
const db = require('../bdd/db');

// Let's go créer le crud de notre app pour le coté Projet

// Créer la Task
router.post('/create', async (req, res) => {
    const { name, description, startDate, endDate, status, authorId, ownerId, projectId } = req.body
    // Go ajouter une task à notre BDD
    try {
        const query = `INSERT INTO Task (taskId, name, description, startDate, endDate, status, authorId, ownerId, projectId)
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?);`;

        db.query(query, [name, description, startDate, endDate, status, authorId, ownerId, projectId], (err, result) => {
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

// Metre à jour un projet
router.put('/updated/:taskId', async (req, res) => {
    const { projectId } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    try {
        const query = `UPDATE Task
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
router.delete('/delete/:taskId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const query = `DELETE FROM Task WHERE taskId = ?;`;

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