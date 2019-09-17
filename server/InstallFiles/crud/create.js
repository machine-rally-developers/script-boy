const Roles = require("../../Models/roles");
const User = require("../../Models/userModel");
const hash = require("hash.js");
const log = console.log;
const chalk = require("chalk");
let createRole = async (data, callback) => {



    Roles.insertMany(data, (err) => {
        if (err) {

            log(chalk.red("Error creating collection 'roles' in mongo db: " + err))
        } else {
            callback()
        }
    });

}
let createUser = async (data, callback) => {
    Roles.findOne({
        role: 'app_owner'
    }, (err, result) => {
        if (!err) {
            //console.log("RESULT: " + result);
            data.role = result._id;
            data.email = data.rootUser;
            data.password = hash.sha256().update(data.rootPassword).digest('hex');
            delete data["rootUser"]
            delete data["rootPassword"]
            let user = new User(data)

            user.save((err) => {
                if (err) {

                    log(chalk.red("Error creating coolection 'roles' in mongo db: " + err))
                } else {
                    callback()
                }
            });
        }

    })

}
module.exports = {
    createRole,
    createUser
}