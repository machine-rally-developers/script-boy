const kvm = require("../../Models/kvmModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let remove = (id) => {
    return new Promise((resolve, reject) => {
        //console.log("reject")
        kvm.findByIdAndDelete(id, (err, res) => {

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