const express = require('express');
const { getArticles, getArticlesByID } = require('../controllers/articles-controller');

const articlesRouter = express.Router();

articlesRouter
  .route('/')
  .get(getArticles)

articlesRouter
  .route('/:article_id')
  .get(getArticlesByID)
  

module.exports = articlesRouter, getArticlesByID;