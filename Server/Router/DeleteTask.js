const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.delete('/deletetask/:taskId', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { taskId } = req.params

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const deleteTask = await TaskModel.findOneAndDelete({ userId: user?._id, _id: taskId })
        if (!deleteTask) return res.status(500).json({ message: 'Internal server error' })
        return res.status(200).json({ message: 'Successfully delete' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server error' })
    }

})

module.exports = router