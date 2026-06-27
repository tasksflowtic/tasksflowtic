const express = require('express')
const dotenv = require('dotenv').config()
const brevo = require('@getbrevo/brevo')


const sendmail = async (user, url, subject) => {

    const { BrevoClient } = await import("@getbrevo/brevo");
    const brevo = new BrevoClient({ apiKey: process.env.BREVO_SETUP_APIKEY });

    try {

        const result = await brevo.transactionalEmails.sendTransacEmail({
            sender: { name: 'tasksflowtic', email: process.env.APP_EMAIL_ADDRESS },
            to: [{ email: user?.email }],
            subject: 'Hello from Brevo!',
            htmlContent: `<p style="color: #6C66EC;">${url}</p>`,
        });

        return {
            status: true,
            message: "Mail sent successfully",
        };

    } catch (error) {
        return {
            status: false,
            message: `Error while sending mail ${error.message}`
        }
    }
}
module.exports = sendmail