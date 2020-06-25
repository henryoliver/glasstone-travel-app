const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = (mail) => {
    transporter.sendMail({
        from: '"Glasstone Travel" <reservations@glasstonegroup.com>',
        to: 'reservations@glasstonegroup.com',
        subject: 'Contact us',
        html: `Contact from the main channel:</br></br>
            Name: <em>${ mail.name }</em></br></br>
            Phone: <em>${ mail.phone }</em></br></br>
            Email: <em>${ mail.email }</em></br></br>
            Message: <em>${ mail.message }`
    }, (error, info) => {
        if (error) {
            return console.error(error);
        }
        return console.info(info);
    });
};
