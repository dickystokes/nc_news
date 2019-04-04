const { fetchArticles, fetchArticleByID, updateArticleByID, deleteArticleByID, fetchCommentsByArticleID} = require('../models/articles-model');

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then((articles) => {
      res.status(200).send({articles});
    })
    .catch();
}

exports.getArticlesByID = (req, res, next) => {
  fetchArticleByID(req.params.article_id).then(article => {
    res.status(200).send({article});
  })
  .catch();
}

exports.patchArticle = (req, res, next) => {
  updateArticleByID(req.params.article_id, req.query.vote_inc)
  .then(article => {
    res.status(202).send({article})
  })
}

exports.deleteArticle = (req, res, next) => {
  deleteArticleByID(req.params.article_id)
  .then(article => {
    res.status(204).send()
  })
}

