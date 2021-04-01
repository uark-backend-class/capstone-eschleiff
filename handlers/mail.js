// const nodemailer = require('nodemailer');
// require('dotenv').config({ path: 'variables.env' });

// let testAccount = async () => {
//     await nodemailer.createTestAccount();
//     return;
// };

// let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email', //process.env.MAIL_HOST,
//     port: 587, //process.env.MAIL_PORT,
//     secure: false,
//     auth: {
//         user: testAccount.user, //process.env.MAIL_USER,
//         pass: testAccount.pass //process.env.MAIL_PASS
//     }
// });

// let mailOptions = {
//     from: 'Boo Ya <noreply@eric.com', //process.env.MAIL_USER,
//     to: 'dch746@zebra.com',
//     subject: 'Sending test email from nodemailer',
//     text: 'THIS IS SAMPLE TEST!'
// };

// exports.send = transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log('Email sent: ' + info.response);
//     }
// })
