const express = require('express');
const { patchComment, deleteComment } = require('../controllers/comments-controller')
const {methodNotAllowed} = require('../errors')

const commentsRouter = express.Router();

commentsRouter
  .route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)


module.exports = commentsRouter