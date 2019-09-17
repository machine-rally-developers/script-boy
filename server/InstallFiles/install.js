const Boom = require("boom");
const Database = require("../database/database-connection");
const DEBUG = process.env.DEBUG;
const mongoose = require('mongoose');
const fs = require('fs');
const log = console.log;
const chalk = require("chalk");
const keypair = require("keypair");
const path = require("path");
const {
    createRole,
    createUser
} = require("./crud/create");


module.exports = async (data, res) => {
    try {
        console.log("Got here")
        //create a connection to the mongo database. 
        let databaseResponse = await Database(data);
        if (DEBUG) console.log("databaseReponse: install.js : " + JSON.stringify(databaseResponse));
        //if there is a no database error, the databaseResponse.error will be undefined
        if (databaseResponse.error === undefined) {

            env(data);
            res.redirect("/login");


            res.status(200).send()
        } else { //there is an error connecting to database

            if (DEBUG) console.log("DB ERROR" + databaseResponse.error);
            res.status(databaseResponse.error.output.statusCode).send(databaseResponse.error.output);
            //res.status().json().send()
        }


        //return databaseResponse;


    } catch (e) {
        if (DEBUG) console.log("install.js " + e)
        let error = Boom.internal("", "Error occured installing files")
        res.status(error.output.statusCode).send(error.output);

    }
    //add database detials to env. this will be the connection details
    function env(data) {
        //create key pairs
        let privateKeyPath = path.join(__dirname, "..", "keys", "private.key");
        let publicKeyPath = path.join(__dirname, "..", "keys", "public.key");
        let envPath = path.join(__dirname, "..", ".env");

        var pair = keypair();
        try {
            if (!fs.existsSync("key")) {
                fs.mkdirSync("keys");
                fs.writeFileSync(privateKeyPath, pair.private);
                fs.writeFileSync(publicKeyPath, pair.public);
                //add mongodb user to env file
                fs.appendFileSync(envPath, '\nDB_USER=' + data.user + '\nDB_PASSWORD=' + data.password + '\nDB_PORT=' + data.port + '\nDB_ADDRESS=' + data.address);
                initializeDatabase(data);
            } else {
                log(chalk.yellow("Keys folder exists. If this is a new install, delete the key folder"));
            }
        } catch (e) {

            log(chalk.red("Error occured writing/creating to 'keys' folder: " + e))
        }


    }
    //initialize mongodb by creating database and collections
    function initializeDatabase(data) {
        //create role
        createRole(getRoles(), createAppOwner);

        //deleteInstallFile();
    }

    function createAppOwner() {
        createUser(data, deleteInstallFile)

    }
    //delete install file on completion
    function deleteInstallFile() {

        let installFilePath = path.join(__dirname, "..", "install");
        fs.unlinkSync(installFilePath);

    }

    function getRoles() {
        return [{
            role: "app_owner",
            scope: ["create.user", "delete.user", "elevate.user", "read.middleware", "write.middleware", "delete.middleware", "update.middleware", "delete.app", "update.app", "create.client_app", "delete.client_app", "update.client_app", "create.dictionary", "delete.dictionary", "update.dictionary", "create.script", "delete.script", "update.script", "create.script_folder", "delete.script_folder", "update.script_folder"]
        }, {
            role: "app_admin",
            scope: ["create.user", "delete.user", "elevate.user", "read.middleware", "write.middleware", "delete.middleware", "update.middleware", "create.client_app", "delete.client_app", "update.client_app", "create.dictionary", "delete.dictionary", "update.dictionary", "create.script", "delete.script", "update.script", "create.script_folder", "delete.script_folder", "update.script_folder"]
        }, {
            role: "app_developer",
            scope: ["read.middleware", "write.middleware", "delete.middleware", "create.client_app", "delete.client_app", "update.client_app", "create.dictionary", "delete.dictionary", "update.dictionary", "create.script", "delete.script", "update.script", "create.script_folder", "delete.script_folder", "update.script_folder"]
        }, {
            role: "app_noob",
            scope: ["read.middleware"]
        }]

    }



}