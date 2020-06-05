const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user.model');

router.post('/register', (req,res) => {
    const newUser = new User({
        username: req.body.username
    })
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            res.status(400).json(err.message);
        }else{
            passport.authenticate("local")(req, res, () => {
                res.json(req.user);
            })
        }
    })
});

router.post('/login', passport.authenticate("local"), (req,res) => {
    res.json(req.user);
})

router.get('/logout', (req,res) => {
    req.logOut();
    res.status(200).json("Logged out successfully!");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.json("Not Logged In Yet!")
};

module.exports = router;