const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const dontenv = require('dotenv').config()

router.patch('/reset-password/:token', async (req, res) => {

    const { token } = req.params
    const { newPassword } = req.body

    try {

        const decode = JWT.verify(token, process.env.PASSWORD_RESET_JWT_SECRET_KEY)
        if (decode.type !== 'password-reset') return res.status(401).json({ message: 'Unauthorized access.' })
        const user = await User.findById({ _id: decode?.id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword
        await user.save()
        return res.status(200).json({ message: 'Password updated successfully.' })

    } catch (error) {
        if (error?.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Password reset link has expired.' })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router