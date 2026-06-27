const mongoose = require('mongoose')

// schema 
const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    taskId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In progress', 'Completed', 'Cancelled']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Work','Personal','Shopping','Study','Health','Home','Finance','Travel','Others']
    },
    repeat: {
        type: String,
    },
    starttime: {
        type: String,
        required: true,
        index: true
    },
    endtime: {
        type: String,
        required: true,
        index: true
    },
    dueDate: {
        type: String,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date,
        index: true
    }
})

// model
const Model = mongoose.model('tasks', Schema)
module.exports = Model