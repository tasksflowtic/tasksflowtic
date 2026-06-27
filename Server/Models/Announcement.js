const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
})

const Model = mongoose.model('announcements', Schema)
module.exports = Model