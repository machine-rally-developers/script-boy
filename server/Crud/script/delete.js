const script = require("../../Models/scriptModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let remove = (id) => {
    return new Promise((resolve, reject) => {
        //console.log("reject")
        script.findByIdAndDelete(id, (err, res) => {

            if (err) {
                console.log("reject")
                reject(err)
            } else {
                console.log("resolve")
                resolve(res)
            }

        })

    });


}
module.exports = remove