/****************IMPORTING PACKAGE*******************************/
const express = require("express");

/****************USING ROUTER************************************/
const router = express.Router();

/**************IMPORTING CONTROLLER******************************/
const formController = require("../controller/form_controller");

/************CONFIGURING DIFFERENT ROUTES***********************/

router.get("/", formController.home);
router.post("/register-google", formController.registerGoogle);
router.post("/register", formController.register);

/*****************EXPORTING ROUTER*******************************/
module.exports = router;  