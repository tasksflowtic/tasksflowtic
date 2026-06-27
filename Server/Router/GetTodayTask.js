const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.get('/todaytask', Middleware, async (req, res) => {
    const { id, role } = req.user
    const now = new Date();
    const startOfDay = new Date(now).setHours(0, 0, 0, 0)
    const endOfDay = new Date(now).setHours(23, 59, 59, 999);

    try {

        if (!id || !role) return;
        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const tasks = await TaskModel.find({
            userId: user?._id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
        return res.status(200).json({
            status: 200,
            messagae: 'Successfull',
            tasks: tasks
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router