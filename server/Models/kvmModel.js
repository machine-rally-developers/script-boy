//at the moment, no need for kvmgroup that should come later in the future
const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const kvmModel = new Schema({
    key: {
        type: String,
        required: true,
        unique: true

    },
    value: {
        type: String,
        required: true,

    },
    encrypted: {
        type: Boolean,
        default: false,

    }
    /* ,
        kvmGroup:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:'kvmGroup', 
            required: true 
        } */

});

kvmModel.plugin(timestamps)
module.exports = mongoose.model("kvm", kvmModel);