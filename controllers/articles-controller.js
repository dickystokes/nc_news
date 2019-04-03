const { fetchArticles, fetchArticleByID } = require('../models/articles-model');

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