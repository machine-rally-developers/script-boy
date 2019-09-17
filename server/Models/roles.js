const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleModel = new Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    scope: {
        type: [],
        required: true
    }



});
module.exports = mongoose.model('roles', roleModel);