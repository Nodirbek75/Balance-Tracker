const router = require('express').Router();
const Transaction = require('../models/transaction.model');

router.get('/:userId', (req,res) => {
    Transaction.find({userId: req.params.userId})
        .then(trans => res.json(trans))
        .catch(err => res.status(400).json("ERROR: ", err.message));
});

router.post('/add', (req,res) => {
    
    const newTrans = new Transaction({
        userId: req.body.userId,
        type: req.body.type,
        currentBalance: Number(req.body.currentBalance),
        inputBalance: Number(req.body.inputBalance),
        description: req.body.description
    })

    newTrans.save()
        .then(trans => res.json(trans))
        .catch(err => res.status(400).json(err.message));
})

router.post('/edit/:id', (req,res) => {
    Transaction.findById(req.params.id)
        .then(trans => {
            trans.userId= req.body.userId;
            trans.type= req.body.type;
            trans.currentBalance= Number(req.body.currentBalance);
            trans.inputBalance= Number(req.body.inputBalance);
            trans.description= req.body.description;

            trans.save()
                .then(updatedTrans => res.json(updatedTrans))
                .catch(err => res.status(400).json(err.message));
        })
        .catch(err => res.status(400).json(err.message));
});

router.post('/delete/:id', (req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(deletedTrans => res.json(deletedTrans))
        .catch(err => res.status(404).json(err.message));
});


module.exports = router;