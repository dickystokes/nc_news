const express = require('express');
const { getArticles, getArticlesByID, patchArticle, deleteArticle } = require('../controllers/articles-controller');
const { getCommentsByArticleID, postNewComment } = require('../controllers/comments-controller')

const articlesRouter = express.Router();

articlesRouter
  .route('/')
  .get(getArticles)

articlesRouter
  .route('/:article_id')
  .get(getArticlesByID)
  .patch(patchArticle)
  .delete(deleteArticle)

articlesRouter
.route('/:article_id/comments')
.get(getCommentsByArticleID)
.post(postNewComment)

  

module.exports = articlesRouter;