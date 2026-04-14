const utilities = require("../utilities/")
const errorController = {}

errorController.produceError = async function(req, res){
    console.log("This route will produce an error.")
    // This will produce an error because the function does not exist
    const data = await utilities.thisFunctionDoesNotExist()
    res.send(data)
}

module.exports = errorController