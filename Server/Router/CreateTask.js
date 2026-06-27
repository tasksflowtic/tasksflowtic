const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.post('/createtask', Middleware, async (req, res) => {
    const { role, id } = req.user
    const { taskcopy } = req.body
    const { nanoid } = await import('nanoid'); // ✅
    const taskId = nanoid()

    try {

        if (!id || !role || !taskcopy || !taskId) return res.status(400).json({ message: 'Require data is missing' })
        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'user  not found' })
        const todaytask = await TaskModel.find({
            userId: user?._id,
            dueDate: taskcopy?.duedate
        }).select('starttime endtime dueDate')
        const conflictTime = todaytask.some(val => taskcopy?.starttime < val.endtime && taskcopy?.endtime > val.starttime)
        const conflictDate = todaytask.some(val => val.dueDate === taskcopy.duedate)
        if (conflictTime && conflictDate) return res.status(401).json({ message: 'Task already exist' })
        const newtask = await TaskModel.create({
            userId: user?._id,
            taskId: taskId,
            title: taskcopy?.title,
            description: taskcopy?.des,
            repeat: taskcopy?.repeat ? taskcopy?.repeat : '',
            category: taskcopy?.category,
            starttime: taskcopy?.starttime,
            endtime: taskcopy?.endtime,
            dueDate: taskcopy?.duedate
        })

        if (!newtask) return res.status(500).json({ message: 'Something went wrong unable to create resource' })
        return res.status(200).json({
            status: 200,
            message: 'Successfully created'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router