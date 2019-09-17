const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
/* const enumUIAttributes = ['string', 'dropdown', 'arrays', 'arrays.object', 'object']
const dropdown = ['dropdown'] */
const pluginModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    /*     uiAttributes: [{
            name: {
                type: String,
                required: true
            },
            dataType: {
                type: String,
                required: true,
                enum: enumUIAttributes
            },
            dropdown: {
                type: [],
                required: isRequired
            }
        }], */
    objectType: {
        type: String,
        required: true,
        enum: ["script.object", "action.object"]
    },
    rootFolder: {
        type: String,
        required: true
    }



});

/* function isRequired() {
    if (dropdown.indexOf(this.enumUIAttributes) > -1) { //"this" contains the employee document at the time of required validation
        return true;
    }
    return false;
} */
pluginModel.plugin(timestamps)
module.exports = mongoose.model("installedPlugins", pluginModel);