const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')

router.patch('/updateprofile', Middleware, async (req, res) => {

    const { id, role } = req.user
    const {updateData} = req.body

    try {

        const updateprofile = await UserModel.findByIdAndUpdate(
            { _id: id },
            { $set: {
                name: updateData?.name
            }}
        )

        if (!updateprofile) res.status(500).json({ message: 'Something went wrong unable to update profile' })
        return res.status(200).json({
            status: 200,
            message: 'Profile update successfully'
        })

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = router