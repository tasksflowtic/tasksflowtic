const express = require('express')
const router = express.Router()
const Announcement = require('../../Models/Announcement')

router.get('/announcements', async (req, res) => {

    try {

        const announcements = await Announcement.find()
        return res.status(200).json({ announcements: announcements })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router