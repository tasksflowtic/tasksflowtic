const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const User = require('../../Models/UserModel')
const Admin = require('../../Models/Admin')

router.patch('/admin/user/:userId/suspend', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { userId } = req.params


    try {

        const admin = await Admin.findById({ _id: id })
        if (admin?.Role !== 'Admin') return res.status(403).json({ Message: 'Access denied' })
        const user = await User.findById({ _id: userId })
        if (!user) return res.status(500).json({ message: 'User not found' })
        user.isActive = !user?.isActive
        user.suspendDate = new Date()
        await user.save()
        res.status(200).json({ message: 'Successfully update' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router