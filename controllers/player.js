const router = require('express').Router();
const db = require('../models');

router.post('/add_player', (req, res) => {
    db.Player.create(req.body)
        .then((dbPlayer) => {
            res.json(dbPlayer);
            console.log(dbPlayer);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'Server error'
            });
        });
});

module.exports = router;