const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Player.find().sort({ score: -1 }).limit(3)
    .then((players) => {
        res.render('index', {
            players: players
        });
    })
    .catch((err) => {
        return res.status(500).json({
            serverMsg: 'Server error'
        });
    });
});

module.exports = router;