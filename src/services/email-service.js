const sender = require('../config/emailConfig')
const TicketRepositary = require('../repository/ticket-repository');


const repo = new TicketRepositary();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        console.log(response);  
    } catch (error) {
        console.log(error); 
    }
}

const fetchPendingEmails = async() => {
    try {
        const response = await repo.get({status: "PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async(data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}


const updateTicketStatus = async(ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        throw error;
    }
}

const subscribeEvents = async(payload) => {
    // console.log(payload,"------");
    let service = payload.service;
    let data = payload.data;
    // console.log(service,data,'====')
    switch(service){
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            // console.log('bhej rahe hain...')
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid event recieved');
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicketStatus,
    subscribeEvents 
}