const express = require('express');
const { getUserByUsername } = require('../controllers/users-controller');
const {methodNotAllowed, handle405} = require('../errors')
const usersRouter = express.Router();

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(methodNotAllowed)
  

module.exports = usersRouter;