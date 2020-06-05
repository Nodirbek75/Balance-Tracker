const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const User = require('./models/user.model');
const localStrategy = require('passport-local').Strategy;
const path = require('path');

const userRoute = require('./routes/user');
const transactionRoute = require('./routes/transaction');
const currentBalanceRouter = require('./routes/currentBalance');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB database connection established successfully!'))
    .catch(err => console.log('DATABASE ERROR: ', err));

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())
app.use(require('express-session')({
    secret: 'Never give up in any condition',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/user', userRoute);
app.use('/transaction', transactionRoute);
app.use('/currentBalance', currentBalanceRouter);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log('Server is running on port ', port);
})
