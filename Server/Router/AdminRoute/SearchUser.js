const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const UserModel = require('../../Models/UserModel')
const Admin = require('../../Models/Admin')

router.get('/admin/searchuser/:Query', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { Query } = req.params

    try {
        const admin = await Admin.findById({ _id: id })
        if (!admin) return;
        if (admin?.Role !== 'Admin') return res.status(403).json({ message: 'Unable to search' })
        const users = await UserModel.find({ email: { $regex: Query, $options: "i" } }).select('name email isActive').limit(10)
        return res.status(200).json({
            users: users
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal servre error' })
    }

})
module.exports = router