const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const topicsRouter = require('./topics-router.js')
const articlesRouter = require('./articles-router.js')
const usersRouter = require('./users-router')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed)

  apiRouter.use('/topics', topicsRouter);
  apiRouter.use('/articles', articlesRouter);
  apiRouter.use('/users', usersRouter);


module.exports = apiRouter;
