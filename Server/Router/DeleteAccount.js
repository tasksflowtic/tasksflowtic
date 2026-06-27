const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')
const bcrypt = require('bcrypt')

router.delete('/deleteAccount/:_id', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { password } = req.body

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const checkPassword = await bcrypt.compare(password, user?.password)
        if (!checkPassword) return res.status(401).json({ message: 'Invalid password' })
        await TaskModel.deleteMany({ userId: user?._id })
        await UserModel.findByIdAndDelete({ _id: user?._id })
        res.clearCookie('authToken')
        return res.status(200).json({ message: 'Account successfully delete' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router