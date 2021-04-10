const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config();

const msg = {
    to: 'ericschleiff@gmail.com',
    from: 'backendspacexproject@gmail.com',
    subject: 'Sending with SendGrid Test',
    text: 'is easy and cool.',
    html: '<p>is easy and cool.</p>',
    templateId: 'd-2827c58b1fe743e29047e08e5a675f1d'
}

function sendMail(msg) {
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.log(error)
        })
};

module.exports = {
    sendMail,
}