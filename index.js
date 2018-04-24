const express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('./lib/logger'),
    handler = require('./lib/device_handler'),
    database = require('./lib/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users/:user_id/devices', handler.create);
app.put('/users/:user_id/devices/:device_id', handler.update);
app.delete('/users/:user_id/devices/:device_id', handler.delete);
app.put('/users/:user_id/devices/:device_id/change', handler.change);

database.openConnection()
    .then(() => {
        console.log('Database connected.');

        app.listen(3000, function () {
            logger.info('Server is listening on port 3000');
        });
    });