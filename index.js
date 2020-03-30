const express = require("express");
const bodyParser = require("body-parser");
const ip = require("request-ip");
const db = require("./config/mongoose");
const expressValidator = require("express-validator");
// const expressSession = require("express-session");


const port = 8000;

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));

app.use(expressValidator());

//setting up static files
app.use(express.static("assets"));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// app.use(expressSession({secret:"max", saveUninitialized: false, resave: false}));

//using express router
app.use("/", require("./routes/index"));

app.listen(port, function(err){
    if(err){
        console.log(`Error in connecting to server, ${err}`);
    }
    console.log(`Server is up and running successfully at port ${port}`);
});

