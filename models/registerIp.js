/****************IMPORTING MONGOOSE*******************************/
const mongoose = require("mongoose");

/***************CREATING IP ADDRESS SCHEMA*****************************/
const registerIpSchema = new mongoose.Schema({
    ip:{
        type: String
    },
    createdAt:{
        type: String
    }

});
 
/******************MAKING MODEL*********************************/
const registerIp = mongoose.model("registerIp", registerIpSchema);

/*****************EXPORTING MODEL*******************************/
module.exports = registerIp;

