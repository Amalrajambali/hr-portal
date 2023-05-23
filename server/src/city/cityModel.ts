// const Mongoose = require("mongoose");
const { Schema , model } = require("mongoose");


const citySchema = new Schema({
    city: {
        type: String,
        requires: true
    }

})

const City = model('City', citySchema);
module.exports = City