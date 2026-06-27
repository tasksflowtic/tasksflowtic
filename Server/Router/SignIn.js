const express = require('express')
const router = express.Router()
const UserModel = require('../Models/UserModel')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()

router.post('/signin', async (req, res) => {

    const { authData } = req.body

    try {

        if (!authData?.email || !authData?.password) return res.status(400).json({ message: 'Require field are missing' })
        const user = await UserModel.findOne({ email: authData?.email })
        if (!user) return res.status(404).json({ message: 'Invalid credentials' })
        const ispassMatch = await bcrypt.compare(authData?.password, user?.password)
        if (!ispassMatch) return res.status(404).json({ message: 'Invalid credantials' })
        const token = JWT.sign({ id: user?._id, role: user?.Role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            status: 200,
            message: 'Signin successfully'
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router