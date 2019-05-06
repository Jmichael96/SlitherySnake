const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Player.find().sort({ score: -1 }).limit(7)
    .then(function(dbPlayer) {
        res.render('index', {
            Player: dbPlayer
        })
        console.log(dbPlayer)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;