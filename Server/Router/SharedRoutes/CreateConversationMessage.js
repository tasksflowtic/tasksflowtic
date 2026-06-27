const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const UserModel = require('../../Models/UserModel')
const ContactSupport = require('../../Models/ContactSupportModel')
const AdminModel = require('../../Models/Admin')

router.post('/contactsupport/create/:conversationId', Middleware, async (req, res) => {
    const { conversationId } = req.params
    const { Message } = req.body
    const { id, role } = req.user

    try {

        var user = null
        if (role === 'User') {
            user = await UserModel.findById({ _id: id })
        } else if (role === 'Admin') {
            user = await AdminModel.findById({ _id: id })
        }
        if (!user) return res.status(404).json({ message: 'Account not found' })
        const Conversation = await ContactSupport.findByIdAndUpdate(
            { _id: conversationId },
            {
                $push: {
                    messages: {
                        message: Message,
                        role: user?.Role
                    }
                }
            }
        )
        if (!Conversation) return res.status(500).json({ message: 'Conversation not found' })
        return res.status(200).json({ message: 'Success' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router