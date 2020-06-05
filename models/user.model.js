const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String}
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

