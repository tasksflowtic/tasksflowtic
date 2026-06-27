const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const AdminModel = require('../Models/Admin')

router.get('/getdata', Middleware, async (req, res) => {
    const { id, role } = req.user
    try {
        if (!id || !role) return res.status(400).json({ message: 'Require data is missing' })
        if (role === 'User') {
            const user = await UserModel.findById({ _id: id }).select('-password')
            if (!user) return res.status(404).json({ message: 'User not found' })
            if (!user?.isActive) return res.status(403).json({
                message: 'Your account has been suspended',
                suspendedOn: user?.suspendDate
            })
            return res.status(200).json({
                status: 200,
                user: user
            })
        } else if (role === 'Admin') {
            const admin = await AdminModel.findById({ _id: id }).select('-password')
            if (!admin) return res.status(404).json('Admin not found')
            return res.status(200).json({
                status: 200,
                user: admin
            })
        }

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router