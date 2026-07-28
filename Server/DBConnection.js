const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const dbconnect = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`DB Connected ${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbconnect