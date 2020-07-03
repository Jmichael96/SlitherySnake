const router = require('express').Router();
const db = require('../models');

router.post('/add_player', (req, res) => {
    db.Player.create(req.body)
        .then((dbPlayer) => {
            res.status(201).json(dbPlayer);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'Server error'
            });
        });
});

router.get('/all_players', (req, res) => {
    db.Player.find().sort({ score: -1 }).limit(20)
    .then((players) => {
        res.status(201).json({
            allPlayers: players
        })
    })
    .catch((err) => {
        return res.status(500).json({
            serverMsg: 'Server error'
        });
    });
});

module.exports = router;