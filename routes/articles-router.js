const express = require('express');
const { getArticles, getArticlesByID, patchArticle, deleteArticle } = require('../controllers/articles-controller');

const articlesRouter = express.Router();

articlesRouter
  .route('/')
  .get(getArticles)

articlesRouter
  .route('/:article_id')
  .get(getArticlesByID)
  .patch(patchArticle)
  .delete(deleteArticle)


  

module.exports = articlesRouter;