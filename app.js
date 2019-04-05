const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500, handle400, handle404, handle405 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use('/*', routeNotFound);

app.use(handle404);

app.use(handle405)

app.use(handle400);

app.use(handle500);

module.exports = app;
