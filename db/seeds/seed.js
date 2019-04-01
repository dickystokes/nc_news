const { topicsData, usersData, articlesData, commentsData } = require('../data/index');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
      return knex('topics')
        .insert(topicsData)
        .returning('*');
        .then(() => {
          // insert data
          return knex('users')
            .insert(usersData)
            .returning('*');
          })
        })
          //.then((insertedTopics, insertedUsers) =>)
}

exports.seed = function (knex, Promise) {
  return knex
    .insert(ownerData)
    .into('owners')
    .returning('*')
    .then((insertedOwners) => {
      return knex
        .insert(shopObjReformatter(ownerRefGen(insertedOwners), shopData))
        .into('shops')
        .returning('*')
        .then((insertedShops) => {
          return knex
            .insert(treasureObjReformatter(shopRefGen(insertedShops), treasureData))
            .into('treasures')
            .returning('*');
        });
    });
};
