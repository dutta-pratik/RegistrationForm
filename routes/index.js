const express = require("express");
const router = express.Router();
const formController = require("../controller/form_controller");


router.get("/", formController.home);

router.post("/register-google", formController.registerGoogle);
router.post("/register", formController.register);

module.exports = router;  