const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Role: {
        type: String,
        required: true,
        default: 'User'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    profile: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        length: 10,
        default: ''
    },
    suspendDate: {
        type: Date,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date
    }
})

const Model = mongoose.model('users', Schema)
module.exports = Model