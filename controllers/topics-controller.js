const { fetchTopics } = require('../models/topics-model');

exports.getTopics = (req, res, next) => {
  fetchTopics(req.query)
    .then((topics) => {
      res.status(200).send({ topics });
    })
 
    .catch();
}