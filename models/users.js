/****************IMPORTING MONGOOSE*******************************/
const mongoose = require("mongoose");

/***************CREATING USER SCHEMA*****************************/
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
});


/******************MAKING MODEL*********************************/
const User = mongoose.model("User", userSchema);

/*****************EXPORTING MODEL*******************************/
module.exports = User;

