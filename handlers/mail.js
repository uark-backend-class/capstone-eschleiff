const User = require('../models/users.model');
const getDate = require('../launches.api');
require('dotenv').config({ path: 'variables.env' });
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// grab latest launch date and substracts 1 hour
// here I set the date to send emails 1 hour prior to the latest date
let launchDate = async () => {
    let response = await getDate.getLatestDate();
    return response
};
let dt = new Date();
let unixDate = Math.floor(new Date(dt.setMinutes(dt.getMinutes() + 5)).getTime() / 1000);
console.log(unixDate);

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


