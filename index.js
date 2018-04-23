const express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('./lib/logger'),
    handler = require('./lib/device_handler'),
    database = require('./lib/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users/:user_id/devices', function (req, res, next) {
    console.log(req.body);

    handler.create(req.body.userId, req.body.device)
        .then(() => {
            res.status(200).send({status: 200})
        })
        .catch((error) => {
            res.status(500).send({status: 500, message: error})
        });
});

app.put('/users/:user_id/devices/:device_id', function (req, res, next) {
    handler.update(req.params.user_id, req.params.device_id, req.body.device)
        .then(() => {
            res.status(200).send({status: 200})
        })
        .catch((error) => {
            res.status(500).send({status: 500, message: error})
        });
});

app.delete('/users/:user_id/devices/:device_id', function (req, res, next) {
    handler.delete(req.params.user_id, req.params.device_id)
        .then(() => {
            res.status(200).send({status: 200})
        })
        .catch((error) => {
            res.status(500).send({status: 500, message: error})
        });
});

database.openConnection()
    .then(() => {
        console.log('Database connected.');

        app.listen(3000, function () {
            logger.info('Server is listening on port 3000');
        });
    });