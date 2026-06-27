const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.get('/getdwmtask/:repeatType', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { repeatType } = req.params

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const tasks = await TaskModel.find({
            userId: user?._id,
            repeat: repeatType
        }).select('title description starttime endtime status category repeat')
        return res.status(200).json({tasks: tasks})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router