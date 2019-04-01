const { topicsData, usersData, articlesData, commentsData } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
      return knex('topics')
        .insert(topicsData)
        .returning('*');
    })
    .then(topicRows => {
      const userInsertions = knex('users')
      .insert(usersData)
      .returning('*')

       return Promise.all([topicRows, userRows])
      
    })
      .then(([topicRows, userRows]) => {
        console.log('finished seeding...')
    })
};
