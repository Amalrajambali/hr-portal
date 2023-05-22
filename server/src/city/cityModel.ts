import mongoose from 'mongoose';
const { Schema } = mongoose;


const citySchema = new Schema({
    city: {
        type: String,
        requires: true
    }

})

const City = mongoose.model('City', citySchema);
module.exports = City