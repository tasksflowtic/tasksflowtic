const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const Admin = require('../../Models/Admin')
const User = require('../../Models/UserModel')
const Task = require('../../Models/TaskModel')

router.get('/adminDashboard', Middleware, async (req, res) => {
    const { id, role } = req.user

    try {

        const admin = await Admin.findById({ _id: id })
        if (admin?.Role !== 'Admin') return res.status(403).json({ message: 'Access denied' })
        if (!admin) return res.status(404).json({ message: 'Account not found' })

        const allUsers = await User.countDocuments()
        const suspendUsers = await User.countDocuments({ isActive: false })
        const allTasks = await Task.countDocuments()
        const pendingTask = await Task.countDocuments({ status: 'Pending' })
        const completedTasks = await Task.countDocuments({ status: 'Completed' })

        const today = new Date()
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const startOfDay = new Date().setHours(0, 0, 0, 0);

        const endOfDay = new Date().setHours(23, 59, 59, 999);

        const todayUsers = await User.find({
            createdAt: {
                $gte: today.setHours(0, 0, 0, 0),
                $lte: today.setHours(23, 59, 59, 999)
            }
        }).select('name email isActive')
        const sevenDaysAgoUsers = await User.countDocuments({
            createdAt: {
                $lte: today,
                $gte: sevenDaysAgo
            }
        })
        const sevenDaysAgoTasks = await Task.countDocuments({
            createdAt: {
                $lte: today,
                $gte: sevenDaysAgo
            }
        })
        const sevenDaysAgoPendingTasks = await Task.countDocuments({
            status: 'Pending',
            createdAt: {
                $lte: today,
                $gte: sevenDaysAgo
            }
        })
        const sevenDaysAgoCompletedTasks = await Task.countDocuments({
            status: 'Completed',
            createdAt: {
                $lte: today,
                $gte: sevenDaysAgo
            }
        })

        return res.status(200).json({
            allUsers: allUsers,
            suspendUsers: suspendUsers,
            allTasks: allTasks,
            pendingTask: pendingTask,
            completedTasks: completedTasks,
            sevenDaysAgoUsers: sevenDaysAgoUsers,
            sevenDaysAgoTasks: sevenDaysAgoTasks,
            sevenDaysAgoPendingTasks: sevenDaysAgoPendingTasks,
            sevenDaysAgoCompletedTasks: sevenDaysAgoCompletedTasks,
            todayUsers: todayUsers
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router