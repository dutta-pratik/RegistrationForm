/****************IMPORTING MODEL*******************************/
const User = require("../models/users");
const registerIp = require("../models/registerIp");

/****************IMPORTING PACKAGE*******************************/
const ip = require("request-ip");
const request = require("request");
const expressValidator = require("express-validator");
var passwordValidator = require('password-validator');

/*************PASSWORD VALIDATOR SCHEMA**************************/
//password-validator schema
var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().symbols()                                 // Must have digits
.has().not().spaces();                    

/****************FETCHING CURRENT DATE,MONTH,YEAR*******************************/
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
console.log(year + "-" + month + "-" + date);
let curDay = year + "-" + month + "-" + date;


/**********EXPORTING FUNCTION FOR home ROUTE******************/
module.exports.home = function(req, res){
    //deletes all ip's data which doesn't correspond to the current date
    registerIp.deleteMany({createdAt: {$ne: curDay}});

    //getting client ip
    let clientIp = ip.getClientIp(req);

    //counting the ip's count
    registerIp.count({
        createdAt: curDay,
        ip:clientIp
    }, function(err, count){
        if(err){
            console.log(err);
        } 
        //render page as per the count
        if(count<=3){
            console.log(count);
            return res.render("form");
        }else{
            console.log(count);
            return res.render("form-new");
        }
    });
}

/**********EXPORTING FUNCTION FOR simple register form ROUTE******************/
module.exports.register =  async function(req, res){
    let existUser = await User.findOne({email: req.body.email});
    if(existUser){
        return res.status(400).json({
            message: "User Already Exist with this Email"
        });
    }else{
        req.check("email", "Invalid Email").isEmail();
        let errors = req.validationErrors();
        if(errors || !schema.validate(req.body.password)){
            console.log("Invalid Email or Password");
        }else{
            User.create(req.body, function(err){
                if(err){
                    console.log("err in creating user", err);
                }
                let clientIp = ip.getClientIp(req);
                console.log(clientIp);
                

                registerIp.create( {
                    ip: clientIp,
                    createdAt: curDay
                } );
                return res.redirect("/");
            });
        }
    }
}

/**********EXPORTING FUNCTION FOR google Auth register form ROUTE******************/
module.exports.registerGoogle = function(req, res){

    console.log(req.body, "regG1");
    if(req.body.captcha === undefined || req.body.captcha === "" || req.body.captcha === null){
        console.log("select Captcha");
    }

    //secretkey
    const secretKey = "6Le7C-UUAAAAAC4lkFW2vMvcxhysHcFcb706sxw2";

    //verify url
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //req to verify url
    request(url, (err, response, body) => {
        console.log(body,"ss");
        console.log(typeof(body),"ss");
        body = JSON.parse(body);
        console.log(body, "regG2");
        console.log(typeof(body), "regG2");
        //if not successful
        if(body.success !== undefined && !body.success){
            console.log("failed captcha");
        }
        console.log('captcha passed successfully');
        User.findOne({email:req.body.email},function(err,user){
            if(err)
            {
                console.log('Error',err);
            }
            if(!user)
            {
                User.create(req.body,function(err,user){
                    if(err)
                    {
                        console.log('error',err);
                    }
                    console.log('User added successfully');
                    return res.render("form-new");
                })
            }
            else{
                console.log('You have already signed up');
                return res.redirect('back');
            }
        });
    });

}