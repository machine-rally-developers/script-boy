const script = require("../../Models/scriptModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let create = (data) => {
    let response = {};
    return new Promise((resolve, reject) => {
        let Script = new script(data);
        //KVM.sa
        Script.save(data, (err, res) => {

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
module.exports = create