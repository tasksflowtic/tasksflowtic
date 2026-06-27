const express = require('express')
const router = express.Router()
const Admin = require('../../Models/Admin')
const Annoucement = require('../../Models/Announcement')
const Middleware = require('../../Middleware')

router.post('/admin/createannouncement', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { Announcement } = req.body

    try {

        const admin = await Admin.findById({ _id: id })
        if (!admin) return res.status(404).json({ message: 'Account not found' })
        if (admin?.Role !== 'Admin') return res.status(403).json({ message: 'Access denied' })
        const newAnnouncement = await Annoucement.create({
            title: Announcement?.title,
            message: Announcement.message
        })
        if (!newAnnouncement) return res.status(500).json({ message: 'Internal server error unable to create resource' })
        return res.status(200).json({
            status: 200
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router