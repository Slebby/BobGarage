// File: src/utils/emailService.js
// This file hold all the functions that relate to email services.

const config = require('../config/config');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport(config.nodemailer_transport);

const sendingEmail = async (payload) => {
    let message;
    let subject;
    switch (payload.type) {
        // send an email with token to verify when they registered
        case 'sendEmailWithToken':
            const verificationToken = jwt.sign({userId: payload.userId}, config.auth.jwtSecret, { expiresIn: '1h', algorithm: 'HS512' });
            const verificationPage = `http://localhost:5173/email/verify?token=${verificationToken}`;

            subject = "Verify Your Email Address with Bob's Garage";
            message = `
            <div>
                <p>Dear ${payload.username},</p>
                <p>Thanks for choosing Bob's Garage! To complete your registration, click the link below to verify your email.</p>
                <p><a href="${verificationPage}">Verify Email Address</a></p>
                <p>If you have any issues, reach out to us at [<a href="mailto:support@bobsgarage.com">support@bobsgarage.com</a>]</p>
                <p>Cheers,</p>
                <p>The Bob's Garage Team</p>
            </div>
            `;
            break;
    
        default:
            break;
    }

    const emailMessage = {
        from: 'no-reply@bobsgarage.com',
        to: payload.email,
        subject,
        html: message
    };

    const info = await transporter.sendMail(emailMessage);

    console.log("Message sent: %s", info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = { sendingEmail };