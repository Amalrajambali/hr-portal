require("dotenv").config()
const mongoose = require("mongoose")
let password = encodeURIComponent(process.env.DB_PASSWORD as string);

const dbConnect = () => {
    return mongoose.connect(
        `mongodb+srv://amalrajambali123:${password}@cluster0.lgsnbkf.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => console.log('Connected!'))
}
module.exports = dbConnect