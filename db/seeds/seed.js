const { topicsData, usersData, articlesData, commentsData } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
      return knex('topics')
      .insert(topicsData)
      .returning('*')
    });
};
