const router = require('express').Router();
/* const jwt = require('jsonwebtoken');
const Boom = require("boom");
const fs = require("fs");
const path = require("path"); */
/* const DEBUG = process.env.DEBUG === "true";
const moment = require('moment'); */
const {
    Boom,
    chalk,
    log,
    fs,
    path,
    debug,
    moment,
    jwt
} = require("../Utilities/required.modules");
//kvm crud
const kvmRead = require("../Crud/kvm/read");
const kvmCreate = require("../Crud/kvm/create");
const kvmDelete = require("../Crud/kvm/delete");
//script crud
const scriptRead = require("../Crud/script/read");
const scriptCreate = require("../Crud/script/create");
const scriptDelete = require("../Crud/script/delete");
const scriptUpdate = require("../Crud/script/update");
const graphqlHTTP = require("express-graphql")
const schema = require("../Crud/graphql/parent.schema")
let privateKey, publicKey;
if (!isInstallFileAvailable()) {

    const databaseConnection = require("./../database/database-connection");
    databaseConnection();
}
//login
router.get("/login", checkInstallFile, (req, res) => {

    res.send("Hello");

});
router.post("/login", checkInstallFile, (req, res) => {

    //check if public key is undefined before loading it
    try {
        if (privateKey === undefined) privateKey = fs.readFileSync(path.join(__dirname, "keys", "private.key"));
        let userDetails = {}
        jwt.sign(userDetails, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1d',
            issuer: 'ScriptBoy',
            iat: moment().unix()
        })
    } catch (e) {

        //throw error
    }


});
//middleware
router.get("/middleware", /*checkInstallFile, jwtVerify,*/ (req, res) => {


});
//home
router.get("/", /*checkInstallFile, jwtVerify,*/ (req, res) => {


});


//kvm
router.route("/kvm").get( /*checkInstallFile, jwtVerify,*/ (req, res) => {

        kvmRead().then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })


    })
    .post( /*checkInstallFile, jwtVerify,*/ (req, res) => {
        console.log(req.body)
        kvmCreate(req.body).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })

    })
    .delete( /*checkInstallFile, jwtVerify,*/ (req, res) => {

        kvmDelete(req.body.id).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })
    });
//script
//kvm
router.route("/script").get( /*checkInstallFile, jwtVerify,*/ (req, res) => {

        scriptRead({}).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })


    })
    .post( /*checkInstallFile, jwtVerify,*/ (req, res) => {
        console.log(req.body)
        scriptCreate(req.body).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })

    })
    .delete( /*checkInstallFile, jwtVerify,*/ (req, res) => {

        scriptDelete(req.body.id).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })
    });
router.route("/script/:id").get( /*checkInstallFile, jwtVerify,*/ (req, res) => {

    if (req.params.id !== undefined) {
        scriptRead({
            "_id": req.params.id
        }).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })
    } else {
        res.status(500).json({
            message: "Invalid script id"
        })
    }


}).put( /*checkInstallFile, jwtVerify,*/ (req, res) => {

    if (req.params.id !== undefined && req.body !== undefined) {
        scriptUpdate({
            "_id": req.params.id
        }, req.body).then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).send(err)

        })
    } else {
        res.status(500).json({
            message: "Invalid script id"
        })
    }


});

//install plugin
router.route("/plugin").get( /*checkInstallFile, jwtVerify,*/ (req, res) => {


    })
    .post( /*checkInstallFile, jwtVerify,*/ (req, res) => {


    })

//apps
router.get("/apps", /*checkInstallFile, jwtVerify,*/ (req, res) => {


});
router.route("/install").get(installValid, (req, res) => {

        res.sendFile(path.join(__dirname, "../", "install.html"));
    })
    .post(installValid, (req, res) => {
        try {
            //called the script that installs the apps
            //console.log("Got here")
            let installFileResponse = require("../installFiles/install")(req.body, res);



        } catch (e) {

            if (debug) console.log("application-route.js " + e)
            let error = Boom.internal("", "Error occured installing files")
            res.status(error.output.statusCode).send(error.output);

        }



    });

function jwtVerify(req, res, next) {
    //check if public key is undefined before loading it
    try {
        if (publicKey === undefined) publicKey = fs.readFileSync(path.join(__dirname, "keys", "public.key"));
        let token = req.cookies("sb_token");
        jwt.verify(token, publicKey, function (err, decoded) {
            if (err) {
                res.cookie("jwt_token", "", {
                    expires: new Date(0)
                });
                res.redirect("/login")

            } else {
                next();
            }
        });
    } catch (e) {

        //throw error
    }


}
//check if the instllation file exist at the root of the server
function checkInstallFile(req, res, next) {
    let installFile = path.join(__dirname, "..", "install");
    if (fs.existsSync(installFile)) {
        if (debug) console.log("Installation file exist");
        res.redirect("/install");
    } else {
        if (debug) console.log("Installation file does not exist");
        next();
    }


}
//check the app is already installed
function installValid(req, res, next) {

    let installFile = path.join(__dirname, "..", "install");
    if (fs.existsSync(installFile)) {
        if (debug) console.log("Installation file exist");
        next();
    } else {
        res.redirect("/");
    }




}

function isInstallFileAvailable() {
    let installFile = path.join("install");
    if (fs.existsSync(installFile)) {
        if (debug) console.log("Installation file exist");
        return true;
    } else {
        if (debug) console.log("Installation file does not exist");
        return false;
    }
}
module.exports = router;