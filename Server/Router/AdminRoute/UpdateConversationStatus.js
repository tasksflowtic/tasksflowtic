const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const Admin = require('../../Models/Admin')
const ContactSupport = require('../../Models/ContactSupportModel')

router.patch('/admin/contactsupport/:conversationId', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { updateData } = req.body
    const { conversationId } = req.params
    try {

        const admin = await Admin.findById({ _id: id, Role: role })
        if (admin?.Role !== 'Admin') return res.status(403).json({ message: 'Access denied' })
        if (!admin) return res.status(404).json({ message: 'Account not found' })
        const updateConversation = await ContactSupport.findByIdAndUpdate(
            { _id: conversationId },
            { $set: { status: updateData } }
        )
        if (!updateConversation) return res.status(500).json({ message: 'Unable to update Conversation try again' })
        return res.status(200).json({ status: 200 })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})
module.exports = router