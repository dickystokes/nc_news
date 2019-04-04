const connection = require('../db/connection');

exports.fetchUserByUsername = (username) => {
    return connection
      .select('*')
      .where('users.username', '=', username)
      .from('users')
  };