const express = require("express")
const router = new express.Router() 
const Util = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

router.get("/login", Util.handleErrors(accountController.buildLogin))
router.get("/register", Util.handleErrors(accountController.buildRegister))
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  Util.handleErrors(accountController.registerAccount)
)

module.exports = router;