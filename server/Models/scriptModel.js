const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const scriptModel = new Schema({

    type: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,
        unique: true

    },
    data: {
        type: String,
        required: true

    }


});
scriptModel.plugin(timestamps)
module.exports = mongoose.model("script", scriptModel);