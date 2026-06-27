const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.patch('/updatetask/:taskId', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { taskId } = req.params
    const { updateData } = req.body

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const allTasks = await TaskModel.find({ userId: user?._id, dueDate: updateData?.dueDate, _id: { $ne: taskId } })
        const conflictTime = allTasks.every(val => updateData?.starttime < val.endtime && updateData?.endtime > val.starttime)
        const conflictDate = allTasks.some(val => val.dueDate === updateData.dueDate)
        if (conflictTime && conflictDate) return res.status(401).json({ message: 'Task already exist' })
        const updateTask = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId: user?._id },
            { $set: updateData }
        )
        if (!updateTask) return res.status(500).json({ message: 'Internal server error' })
        return res.status(200).json({ message: 'Successfully updated' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router