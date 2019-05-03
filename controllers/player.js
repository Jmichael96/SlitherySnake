const router = require('express').Router();
const db = require('../models');

router.post('/player', (req, res) => {
    db.Player.create(req.body)
        .then((dbPlayer) => {
            res.json(dbPlayer);
            console.log(dbPlayer);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;