const mongoose = require("mongoose");

const registerIpSchema = new mongoose.Schema({
    ip:{
        type: String
    },
    createdAt:{
        type: String
    }

});
 
//making model
const registerIp = mongoose.model("registerIp", registerIpSchema);
//exporting the schema
module.exports = registerIp;

