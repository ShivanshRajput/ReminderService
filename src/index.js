const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const setupJobs = require('./utils/job');
const { sendBasicEmail } = require('./services/email-service');
const TicketContoller = require('./controllers/ticket-controller');

const setupAndStartServer = () => {
    const app = express();


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets' , TicketContoller.create);
    // app.get('/test' , )

    app.listen(PORT , () => {
        console.log(`server started @port ${PORT}`);
        
        // sendBasicEmail(
        //     'support123@admin.com',
        //     'photos01.ashu@gmail.com',
        //     'Testing Mail from index.js file',
        //     'Hey how are ou i think you might like this support and if you dont just get lost '
        // )


        setupJobs();

    });
}

setupAndStartServer();
