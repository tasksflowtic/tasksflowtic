const express = require('express')
const router = express.Router()
const sendmail = require('../Middlewares/Nodemailer')
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const otpGenerator = require('otp-generator')
const OtpModel = require('../Models/OtpModel')

router.post('/requestotp', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { newemail } = req.body

    try {
        const checkemail = await UserModel.findOne({ email: newemail?.email })
        if (checkemail) return res.status(401).json({ message: 'Email already exist' })
        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        if (!otp) return;
        const createotp = await OtpModel.create({
            userId: user?._id,
            otp: otp
        })
        if (!createotp) return res.status(500).json({ message: 'Internal server error' })
        const subject = 'Use This OTP to Verify Your New Email Address'
        const sendMail = await sendmail(user, otp, subject) //sendmail using nodemailer
        if (sendMail.status) return res.status(200).json({ message: sendMail?.message })
        if (!sendMail.status) return res.status(500).json({ message: 'Unable to send mail. Please try again later' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})

router.patch('/requestEmailupdate', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { newemail } = req.body

    try {

        const checkemail = await UserModel.findOne({ email: newemail?.email })
        if (checkemail) return res.status(401).json({ message: 'Email already exist' })
        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const otp = await OtpModel.findOne({
            userId: user?._id,
            otp: newemail?.otp
        })
        if (!otp) return res.status(400).json({ message: 'Otp is invalid or expire' })
        const updateUser = await UserModel.findByIdAndUpdate(
            { _id: user?._id },
            { $set: { email: newemail?.email } }
        )
        if (!updateUser) return res.status(500).json({ message: 'Internal server error unable to update try again' })
        return res.status(200).json({ message: 'Successfully update' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = router