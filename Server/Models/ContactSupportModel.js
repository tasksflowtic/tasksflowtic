const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Open', 'Closed', 'Resolved']
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    messages: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: new Date
    }
})

const Model = mongoose.model('contactsupports', Schema)
module.exports = Model