const express = require('express')
const router = express.Router()
const AdminModel = require('../../Models/Admin')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()

router.post('/admin/signin', async (req, res) => {

    const { adminAuth } = req.body

    try {

        const admin = await AdminModel.findOne({
            name: adminAuth?.name,
            email: adminAuth?.email,
            uniqueId: adminAuth?.uniqueId
        })
        if (!admin) return res.status(404).json({ message: 'Account not found' })
        const matchPassword = await bcrypt.compare(adminAuth?.password, admin?.password)
        if (!matchPassword) return res.status(401).json({ message: 'Password is incorrect' })
        const token = JWT.sign({ id: admin?._id, role: admin?.Role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({
            message: 'Successfully signin'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router