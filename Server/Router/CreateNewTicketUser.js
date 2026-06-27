const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const ContactSupport = require('../Models/ContactSupportModel')

router.post('/support/message', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { message } = req.body

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const create = await ContactSupport.create({
            userId: user?._id,
            email: user?.email,
            name: user?.name,
            issue: message?.issue,
            messages: {
                message: message?.message,
                role: user?.Role
            }
        })
        if (!create) return res.status(500).json({ message: 'Unable to create resource internal server error' })
        return res.status(200).json({ message: 'Resource successfully created' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router