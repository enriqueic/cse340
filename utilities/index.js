const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid = ''
  if (data && data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +': ' + vehicle.description + '" ></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
    * Build detail view HTML
 **************************************** */
Util.buildDetailView = async function(data){
  let detail = ''
  if (data && data.length > 0) {
    const vehicle = data[0]
        detail +='<section id="detail-display">'
        detail +='<picture>'
        detail += '<img src="' + vehicle.inv_image + '" alt="Image of ' 
    + vehicle.inv_make + ' ' + vehicle.inv_model + ': ' + vehicle.inv_description + '" >'
        detail +='</picture>'
        detail += '<div>'
        detail +=  '<div><h2>Name: ' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2></div>'
        detail +=  '<div id="price-and-mileage"><h2>Mileage: ' + vehicle.inv_miles.toLocaleString() + '</h2> <h2>Price: $' 
    + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</h2></div>'
        detail +=  '<div>'
        detail +=    '<ul>'
        detail +=      '<li>Color: ' + vehicle.inv_color + '</li>'
        detail +=      '<li>Year: ' + vehicle.inv_year + '</li>'
        detail +=      '<li>Description: <p>' + vehicle.inv_description + '</p></li>'
        detail +=    '</ul>'
        detail +=  '</div>'
        detail +='</div>'
        detail +='</section>'  
  } else {
    detail = '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  }
  return detail
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util