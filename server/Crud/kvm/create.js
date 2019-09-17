const kvm = require("../../Models/kvmModel");
const {
    Boom,
    chalk,
    log
} = require("../../Utilities/required.modules");

let create = (data) => {
    let response = {};
    return new Promise((resolve, reject) => {
        let KVM = new kvm(data);
        //KVM.sa
        KVM.save(data, (err, res) => {

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