const router = require('express').Router();
const db = require('../models');

router.post('/player', (req, res) => {

    if (!req.body.name) {
        res.json('Must insert name to submit')
    };

    db.Player.create(req.body)
    .then((dbPlayer) => {
        console.log(dbPlayer);
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;