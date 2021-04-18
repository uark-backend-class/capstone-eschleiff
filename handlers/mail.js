const User = require('../models/users.model');
const getDate = require('../launches.api');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config();

// grab latest launch date and converts it to a unix timestamp minus 1 hour
// here I set the date to send emails 1 hour prior to the latest date
let launchDate = new Date(getDate.getLatestDate());
let unixDate = launchDate.setHours(launchDate.getHours() - 1);

// grabs all the emails in the db

async function getEmails() {
    let userEmails = [];
    let users = await User.find({}, { "email": 1});
    
    let emails = users.map(user => user.email);
    emails.forEach((email) => {
        if(!userEmails.includes(email)) {
            userEmails.push(email);
        };
    });
    return (userEmails);
};

let emails = getEmails();

// send email to all users in db 1 hour before launch time
function sendMail() {
    for (email of emails) {
        sgMail
            .send({
                to: email,
                from: 'backendspacexproject@gmail.com',
                send_at: unixDate,
                templateId: 'd-2827c58b1fe743e29047e08e5a675f1d'
            })
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

module.exports = {
    sendMail,
    getEmails
}


