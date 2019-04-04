const { fetchUserByUsername } = require('../models/users-model');


exports.getUserByUsername = (req, res, next) => {
  fetchUserByUsername(req.params.username).then(user => {
    res.status(200).send({user});
  })
  .catch();
}