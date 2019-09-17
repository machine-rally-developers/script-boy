const script = require("../../Models/scriptModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let update = (constraint, data) => {
    let response = {};
    return new Promise((resolve, reject) => {
        //console.log("reject")
        script.findOneAndUpdate(constraint, data, (err, res) => {

            if (err) {
                console.log("reject")
                reject(err)
            } else {
                console.log("resolve")
                resolve(res)
            }

        })

    })



}
module.exports = update