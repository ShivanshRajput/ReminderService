const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
// const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = () => {
    const app = express();

    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT , () => {
        console.log(`server started @port ${PORT}`);

        // sendBasicEmail(
        //     'support123@admin.com',
        //     'mailingservice189@gmail.com',
        //     'Testing Mail from index.js file',
        //     'Hey how are ou i think you might like this support and if you dont just get lost '
        // )
    });
}

setupAndStartServer();
