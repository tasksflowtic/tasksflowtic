const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')

router.patch('/updatepassword', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { updateData } = req.body

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const checkPassword = await bcrypt.compare(updateData?.oldPassword, user?.password)
        if (!checkPassword) return res.status(401).json({ message: 'Invalid old password' })
        const hashPassword = await bcrypt.hash(updateData?.newPassword, 10)
        const updatePassword = await UserModel.findByIdAndUpdate(
            { _id: user?._id },
            { $set: { password: hashPassword } }
        )
        if (!updatePassword) res.status(500).json({ message: 'Unable to update internal server error' })
        return res.status(200).json({ message: 'Successfully update' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = router