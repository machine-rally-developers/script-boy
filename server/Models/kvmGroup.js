const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const kvmGroup = new Schema({
    group: {
        type : String,
        required :true,
        unique : true

    }
   

});
module.exports = mongoose.model("kvmGroup", kvmGroup);