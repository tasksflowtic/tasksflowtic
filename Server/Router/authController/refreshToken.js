const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('../../Models/UserModel')

router.post('/auth/refreshtoken', async (req, res) => {

    const refreshApiToken = req.cookies.refreshToken

    try {

        if (!refreshApiToken) return res.status(403).json({ message: 'Token is missing' })
        const decodeToken = JWT.verify(refreshApiToken, process.env.JWT_SECRET_KEY)
        // if (decodeToken?.type !== 'refreshApitoken') return res.status(403).json({ message: 'Unathorized' })
        const user = await User.findById({ _id: decodeToken?.id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (user?.Role !== decodeToken?.role) return res.status(403).json({ message: 'Invalid token' })
        const token = JWT.sign({ id: user?._id, role: user?.Role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        
        res.cookie('authToken', token, {
            httpOnly: false,
            sameSite: 'lax',
            patch: '/'
        }) 
        return res.status(200).json({
            status: 200
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = router