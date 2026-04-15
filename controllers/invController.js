const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* Build inventory by inventory id view */
invCont.buildByInvId = async function(req, res, next){
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)
  const detail = await utilities.buildDetailView(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: data[0].inv_make + " " + data[0].inv_model + " details",
    nav,
    detail,
  })
}
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

invCont.buildAddClassification = async function(req, res, next){
  let nav = await utilities.getNav()
  console.log(nav)
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    classification_name: "",
  })
}

invCont.buildAddVehicle = async function(req, res, next){
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    errors: null,
    classificationList,
    classification_id: "",
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
  })
}

invCont.addVehicle = async function(req, res, next){
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body

  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(
    classification_id
  )

  const errors = []
  if (!classification_id) errors.push({ msg: "Classification is required." })
  if (!inv_make) errors.push({ msg: "Make is required." })
  if (!inv_model) errors.push({ msg: "Model is required." })
  if (!inv_year || !/^\d{4}$/.test(inv_year))
    errors.push({ msg: "Year is required and must be a 4-digit number." })
  if (!inv_description) errors.push({ msg: "Description is required." })
  if (!inv_image) errors.push({ msg: "Image path is required." })
  if (!inv_thumbnail) errors.push({ msg: "Thumbnail path is required." })
  if (!inv_price || isNaN(Number(inv_price)))
    errors.push({ msg: "Price is required and must be a number." })
  if (!inv_miles || isNaN(Number(inv_miles)))
    errors.push({ msg: "Miles is required and must be a number." })
  if (!inv_color) errors.push({ msg: "Color is required." })

  if (errors.length > 0) {
    res.status(400).render("./inventory/add-vehicle", {
      title: "Add Vehicle",
      nav,
      errors: { array: () => errors },
      classificationList,
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    })
    return
  }

  const regResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (regResult) {
    req.flash(
      "notice",
      `You\'ve added the ${inv_make} ${inv_model} vehicle.`
    )
    res.status(201).redirect("/inv")
    return
  }

  res.status(500).render("./inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    errors: { array: () => [{ msg: "Sorry, there was an error adding the vehicle." }] },
    classificationList,
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  })
}

invCont.addClassification = async function(req, res, next){
  const { classification_name } = req.body
  const regResult = await invModel.addClassification(classification_name)
  if (regResult) {
    req.flash(
      "notice",
      `You\'ve added the ${classification_name} classification.`
    )
    res.status(201).redirect("/inv")
    return
  }

  req.flash("notice", 'Sorry, there was an error adding the classification.')
  let nav = await utilities.getNav()
  res.status(500).render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    classification_name,
  })
}

module.exports = invCont
