const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const User = require('../Models/UserModel')
const Project = require('../Models/Project')

router.post('/createproject', Middleware, async (req, res) => {

    const { id, role } = req.user
    const {project} = req.body

    try {

        const user = await User.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const createProject = await Project.create({
            userId: user?._id,
            projectname: project?.projectname,
            projectdes: project?.projectdes,
            category: project?.category,
            startdate: project?.startdate,
            duedate: project?.duedate,
        })
        if (!createProject) return res.status(500).json({ message: 'Internal server error Unable to create project' })
        return res.status(200).json({ status: 200 })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router