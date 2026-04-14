const express = require("express")
const router = new express.Router() 
const errorController = require("../controllers/500errorController")
const Util = require("../utilities")

router.get("/", Util.handleErrors(errorController.produceError))

module.exports = router;
