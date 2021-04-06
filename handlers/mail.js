const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config({ path: 'variables.env' });

const msg = {
    to: 'ericschleiff@gmail.com',
    from: 'backendspacexproject.gmail.com',
    subject: 'Sending with SendGrid Test',
    text: 'is easy and cool.',
    html: '<p>is easy and cool.</p>'
}

sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.log(error)
    })
/*
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// let options = {
//     extName: '.hbs',
//     viewPath: __dirname+'/views/email/',
//     layoutsDir: __dirname+'/views/email/',
//     defaultLayout: 'email-layout',

// }
// transporter.use('compile', hbs(options));

let mailOptions = {
    from: 'Jon Sno <noreply@eric.com',
    to: 'ericschleiff@gmail.com',
    subject: 'Sending test email from nodemailer',
    text: 'TEST EXAMPLE',
    // template: 'email-layout',
    // context: {
    //     name: 'Name'
    // }
};

exports.send = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
})
*/


