const script = require("../../Models/scriptModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let read = (data) => {
    let response = {};
    return new Promise((resolve, reject) => {
        //console.log("reject")
        script.find(data, 'name type data', (err, res) => {

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
module.exports = read