const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const Util = require("../utilities")
const classificationValidate = require("../utilities/classification-validation")


// Route to build inventory by classification view
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", Util.handleErrors(invController.buildByInvId));

router.get("/", Util.handleErrors(invController.buildManagement));
router.get("/add-classification", Util.handleErrors(invController.buildAddClassification));
router.get("/add-vehicle", Util.handleErrors(invController.buildAddVehicle));

router.post("/add-vehicle", Util.handleErrors(invController.addVehicle));

router.post(
  "/add-classification",
  classificationValidate.classificationRules(),
  classificationValidate.checkClassificationData,
  Util.handleErrors(invController.addClassification)
)

module.exports = router;