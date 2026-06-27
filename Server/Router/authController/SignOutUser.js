const express = require('express')
const router = express.Router()

router.post('/signout', async (req, res) => {

    try {

        res.clearCookie('authToken', {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({ message: 'Successfully logout' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error try again' })
    }

})
module.exports = router