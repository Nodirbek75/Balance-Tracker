const router = require('express').Router();
const CurrentBalance = require('../models/currentBalance.model');

router.get('/:userId', (req,res) => {
    CurrentBalance.find({userId: req.params.userId})
        .then(crntBalance => res.json(crntBalance[0]))
        .catch(err => res.status(400).json(err.message));
});

router.post('/add', (req,res) => {
    const userId = req.body.userId;
    const currentBalance = req.body.currentBalance;

    const newCrntBalance = new CurrentBalance({
        userId,
        currentBalance
    }) 

    newCrntBalance.save()
        .then(crntBalance => res.json(crntBalance))
        .catch(err => res.status(400).json(err.message));
})

router.post('/update', (req,res) => {
    CurrentBalance.find({userId: req.body.userId})
        .then(crntBalance => {
            crntBalance[0].currentBalance = req.body.currentBalance;
            crntBalance[0].save()
                .then(crntBalance => res.json(crntBalance))
                .catch(err => res.status(400).json(err.message));
        })
        .catch(err => res.status(400).json(err.message));
})

module.exports = router;