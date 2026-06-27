const express = require('express')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const UserModle = require('./Models/UserModel')
const AdminModel = require('./Models/Admin')

const Middleware = async (req, res, next) => {
    try {
        
        const token = req.cookies.authToken
        if (!token) return res.status(401).json({ message: 'Invalid token format' })
        const decode = JWT.verify(token, process.env.JWT_SECRET_KEY)

        if (decode.role === 'User') {
            const user = await UserModle.findById({ _id: decode?.id })
            if (!user) return;
            req.user = decode
            next()
        } else if (decode?.role === 'Admin') {
            const admin = await AdminModel.findById({ _id: decode?.id })
            if (!admin) return;
            req.user = decode
            next()
        }

    } catch (error) {
        return res.status(401).json({ message: 'token is expire' })
    }
}

module.exports = Middleware