const mongoose = require('mongoose')
const express = require('express')

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 120, // 120 seconds = 2 minutes
    },
})

const Model = mongoose.model('otp', Schema)
module.exports = Model