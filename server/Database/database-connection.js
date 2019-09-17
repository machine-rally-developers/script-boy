const mongoose = require("mongoose");
const Boom = require("boom");
const DEBUG = process.env.DEBUG === "true";
const dbName = process.env.DB_NAME;
let db;
module.exports = async (data) => {

    if (DEBUG) console.log("DATA " + JSON.stringify(data));
    //hold details
    let result = {

    }
    try {
        if (data === undefined) {

            await mongoose.connect(`mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}`, {
                useNewUrlParser: true,
                user: process.env.DB_USER,
                pass: process.env.DB_PASSWORD,
                dbName: process.env.DB_NAME,
                authSource: 'admin'
            })
        } else {

            await mongoose.connect("mongodb://" + data.address + ":" + data.port, {
                useNewUrlParser: false,
                user: data.user,
                pass: data.password,
                dbName,
                authSource: 'admin'
            });

        }
        db = mongoose.connection
        db.on("error", (err) => {

            if (DEBUG) console.log(err);
            let error = Boom.badData("Couldn't log you in to the Database. Make sure the form data is complete and correct", err);
            result.error = error;


        });
        db.once("open", (err, resp) => {

            if (DEBUG) console.log(resp)

            result.data = resp;


        })
        return result;
    } catch (err) {

        if (DEBUG) console.log("Catch: database-connection: " + err);

        result.error = Boom.badImplementation('Catch block');
        return result;
    }

}