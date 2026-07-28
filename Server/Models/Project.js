const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    projectname: {
        type: String,
        required: true
    },
    projectdes: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date,
        required: true
    }

})

const Model = mongoose.model('projects', Schema)
module.exports = Model