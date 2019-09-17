const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
    developer:{type:String, required: true, unique:true},
    approved:{type:boolean, default:false},
    attributes:{type: [{
        key :{type : String, required: true},
        value:{tyoe : String, required: true}
    }]},
    



});