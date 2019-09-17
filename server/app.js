const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const port = 9443;
const Boom = require("Boom");
const fs = require("fs");
const path = require("path");

let envPath = path.join(__dirname, "/.env")
//check if .env file exist
if (fs.existsSync(envPath)) {
    require('dotenv').config();
    //console.log("Exist")
} else { // If env file does not exist, create one

    //create .env file function
    createEnvFile();
}
const routerOne = require("./routes/application-routes");
const routerTwo = require("./routes/middleware-route");
const graphqlHTTP = require("express-graphql")
const schema = require("./Crud/graphql/parent.schema")
const cors = require('cors')
app.use(cors())
app.use(cookieParser());
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); */
app.use(express.static("public"));
app.use("/", [routerOne, routerTwo]);
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
app.use("*", (req, res, next) => {
    try {

        throw Boom.notFound("The page you're looking for cannot be found");
    } catch (err) {
        res.send(err.output);
    }

})

//app.use(morgan());



http.listen(port, () => {

    console.log("Server listen at port: " + port);
});

function createEnvFile() {
    fs.writeFileSync(".env", "DEBUG = true\nDB_NAME = scriptboy", (err, data) => {
        //if error creating file, display to console
        if (err) console.log("Error occured creating and write to env file [ " + err + " ]");
        else {
            require('dotenv').config();
        }
    });

}