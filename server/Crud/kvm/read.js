const kvm = require("../../Models/kvmModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let read = () => {
    let response = {};
    return new Promise((resolve, reject) => {
        //console.log("reject")
        kvm.find({}, (err, res) => {

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