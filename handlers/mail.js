const User = require('../models/users.model');
const getDate = require('../launches.api');
require('dotenv').config({ path: 'variables.env' });
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// grab latest launch date and substracts 1 hour
// here I set the date to send emails 1 hour prior to the latest date
async function getNewDate() {
    let response = await getDate.getLatestDate();
    let unix = response - (60 * 60);
    return unix;
};

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
    //console.log(userEmails);
    return userEmails;
};


// send email to all users in db 1 hour before launch time
async function sendMail() {
    let emails = await getEmails();
    let unixDate = await getNewDate();
    for (email of emails) {
        await sgMail
            .send({
                to: email,
                from: 'backendspacexproject@gmail.com',
                send_at: unixDate,
                templateId: 'd-2827c58b1fe743e29047e08e5a675f1d'
            })
            .then(() => {
                console.log('Email scheduled')
            })
            .catch((error) => {
                console.log(error.response.body)
            })
    }
};

sendMail();

module.exports = {
    sendMail,
    getEmails
}


