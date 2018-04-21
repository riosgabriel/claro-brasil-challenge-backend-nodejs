const express = require('express'),
      logger = require('./lib/logger');

const app = express();

app.post('/user/device', function (req, res, next) {
    res.send('Post Method')
});

app.put('/user/device/:id', function (req, res, next) {
    res.send('Put Method')
});

app.delete('/user/device/:id', function (req, res, next) {
    res.send('Delete Method')
});

app.listen(3000, function () {
    logger.info('Server is listening on port 3000');
});