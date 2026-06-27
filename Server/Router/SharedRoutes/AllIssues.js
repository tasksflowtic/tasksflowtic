const express = require('express')
const router = express.Router()
const Middleware = require('../../Middleware')
const User = require('../../Models/UserModel')
const ContactSupport = require('../../Models/ContactSupportModel')
const Admin = require('../../Models/Admin')

router.get('/contactsupport/allissues', Middleware, async (req, res) => {
    const { id, role } = req.user

    try {
        var allIssues = null
        if (role === 'User') {
            const user = await User.findById({ _id: id })
            if (!user) return res.status(404).json({ message: 'User not found' })
            allIssues = await ContactSupport.find({ userId: user?._id }).select('name issue status createdAt')
        }else if(role === 'Admin'){
            const admin = await Admin.findById({_id: id})
            if(!admin?.Role === 'Admin') return res.status(401).json({message: 'Access denied'})
            if(!admin) return res.status(404).json({message: 'Account not found'})
            allIssues = await ContactSupport.find().select('name issue status createdAt')
        }
        return res.status(200).json({
            message: 'Successfull',
            allIssues: allIssues
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router