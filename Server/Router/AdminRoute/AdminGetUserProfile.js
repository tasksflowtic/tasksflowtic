const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const Admin = require('../../Models/Admin')
const User = require('../../Models/UserModel')
const Tasks = require('../../Models/TaskModel')

router.get('/admin/userProfile/:userId', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { userId } = req.params

    try {

        const admin = await Admin.findById({ _id: id })
        if (!admin) return res.status(404).json({ message: 'Account not found' })
        if (admin?.Role !== 'Admin') return res.status(403).json({ message: 'Access denied' })
        const user = await User.findById({ _id: userId }).select('-password')
        if (!user) return res.status(404).json({ message: 'User not found' })
        const alltasks = await Tasks.countDocuments({ userId: user?._id })
        const pendingTasks = await Tasks.countDocuments({ userId: user?._id, status: 'Pending' })
        const completedTasks = await Tasks.countDocuments({ userId: user?._id, status: 'Completed' })

        return res.status(200).json({
            user: user,
            allTasks: alltasks,
            pendingTasks: pendingTasks,
            completedTasks: completedTasks
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = router