const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors/index');
const topicsRouter = require('./topics-router.js')
const articlesRouter = require('./articles-router.js')
const usersRouter = require('./users-router')
const commentsRouter = require('./comments-router')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed)

  apiRouter.use('/topics', topicsRouter);
  apiRouter.use('/articles', articlesRouter);
  apiRouter.use('/users', usersRouter);
  apiRouter.use('/comments', commentsRouter)


module.exports = apiRouter;
