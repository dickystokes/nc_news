const express = require('express');
const { getUserByUsername } = require('../controllers/users-controller');

const usersRouter = express.Router();

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  

module.exports = usersRouter;