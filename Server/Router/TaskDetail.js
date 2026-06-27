const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.get('/taskdetail/:taskId', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { taskId } = req.params
    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'Usre not found' })
        const task = await TaskModel.findOne({
            userId: user?._id,
            _id: taskId
        }).select()
        if (!task) return res.status(404).json({ message: 'Task not found' })
        return res.status(200).json({
            task: task,
            message: 'Task found'
        })

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})
module.exports = router