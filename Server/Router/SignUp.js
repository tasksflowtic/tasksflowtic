const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const UserModel = require('../Models/UserModel')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()

router.post('/signup', async (req, res) => {
    const { authData } = req.body
    const hashpassword = await bcrypt.hash(authData?.password, 10)

    try {
        if (!authData || !hashpassword) return res.status(400).json({ message: 'Require field are missing' })
        const find = await UserModel.findOne({ email: authData?.email })
        if (find) return res.status(409).json({ message: 'Email already exist' })
        const createUser = await UserModel.create({
            name: authData?.name.toLowerCase(),
            email: authData?.email.toLowerCase(),
            password: hashpassword
        })
        if (!createUser) return res.status(500).json({ message: 'Unable to create account' })
        const token = JWT.sign({ id: createUser?._id, role: createUser?.Role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            status: 200,
            message: 'Successfully created'
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

})
module.exports = router