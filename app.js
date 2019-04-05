const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handle500);

app.use((err, req, res, next) => {
    const badRequestCodes = ['22P02'];
    if (badRequestCodes.includes(err.code)) {
      res.status(400).send({ msg: err.message || 'Bad Request' });
    } else next(err);
});

module.exports = app;
