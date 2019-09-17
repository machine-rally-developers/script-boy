const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profile = {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    occupation: {
        type: String
    },
    hobbies: {
        type: String
    },
    location: {
        type: String
    }

}
const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roles'
        }],
        required: true
    },
    login: {
        type: []
    },
    userProfile: profile,
    passwordLastChanged: {
        type: Date,
        default: Date.now()
    }



});
module.exports = mongoose.model('users', userModel);