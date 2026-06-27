const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const ContactSupportMessage = require('../Models/ContactSupportModel')

router.get('/contactsupportmessaege', Middleware, async (req, res) => {

    const { id, role } = req.user

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const Message = await ContactSupportMessage.find({ userId: user?._id })
        return res.status(200).json({
            messages: Message,
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = router