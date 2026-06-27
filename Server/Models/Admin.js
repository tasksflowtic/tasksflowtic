const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    Role: {
        type: String,
        required: true,
        default: 'Admin'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date
    }
})

const Model = mongoose.model('admniaccs', AdminSchema)
module.exports = Model