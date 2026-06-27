const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const UserModel = require('../../Models/UserModel')
const AdminModel = require('../../Models/Admin')
const ContactSupport = require('../../Models/ContactSupportModel')

router.get('/support/message/:conversationId', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { conversationId } = req.params

    try {

        var user = null
        if (role === 'User') {
            user = await UserModel.findById({ _id: id })
        } else if (role === 'Admin') {
            user = await AdminModel.findById({ _id: id })
        }
        if (!user) return res.status(404).json('Account not found')
        const Conversation = await ContactSupport.findById({ _id: conversationId })
        if (!Conversation) return res.status(404).json({ message: 'Coversation not found' })
        return res.status(200).json({
            conversation: Conversation,
            message: 'Successfull'
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router