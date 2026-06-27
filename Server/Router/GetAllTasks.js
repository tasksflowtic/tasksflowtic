const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.get('/alltasks/:date', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { date } = req.params

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        var tasks = null
        if (date === 'alltask') {
            tasks = await TaskModel.find({ userId: user?._id })
        } else {
            tasks = await TaskModel.find({
                userId: user?._id,
                dueDate: date
            })
        }
        return res.status(200).json({
            status: 200,
            messagae: 'Successfull',
            tasks: tasks
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal servre error' })
    }

})
module.exports = router