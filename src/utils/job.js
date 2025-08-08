const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => { 
        // repeat mail logic must go there
        console.log('Running Jobs every min');
        const pendingEmails = await emailService.fetchPendingEmails();
        pendingEmails.forEach(email => {
            sender.sendMail({
                from: 'ReminderService@airline.com',
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            },async (err,data) => {
                if(err){
                    console.log(err);
                    return;
                }
                console.log(data);
                // logic to update ticket database will go here....
                await emailService.updateTicketStatus(email.id , {status:"SUCCESS"});

            });
        });
        // console.log(response);
    })
}

module.exports = setupJobs;