const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data/index");

const {articlesReformatter, commentsReformatter} = require('../utils/date-reformatter')

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
      return Promise.all([
        knex("topics")
          .insert(topicsData)
          .returning("*"),
        knex("users")
          .insert(usersData)
          .returning("*")
      ])
        .then(([topicsRows, usersRows]) => {
          return knex('articles')
          .insert(articlesReformatter(articlesData))
          .returning('*')
        })
        .then(articleRows => {
          return knex('comments')
          .insert(commentsReformatter(commentsData))
          .returning('*')
        });

    })
}

    //   return knex("topics")
    //     .insert(topicsData)
    //     .returning("*")
    //     .then(topicRows => {
    //       const userInsertions = knex("users")
    //         .insert(usersData)
    //         .returning("*");
    //       Promise.all([topicRows, userInsertions]).then(
    //         ([topicRows, userRows]) => {
    //           const articleInsertions = knex("articles")
    //             .insert(articlesData)
    //             .returning("*");
    //           Promise.all([topicRows, userRows, articleInsertions]).then(
    //             ([topicRows, userRows, articleRows]) => {
    //               const commentInsertions = knex("comments")
    //                 .insert(commentsData)
    //                 .returning("*");
    //               return Promise.all([
    //                 topicRows,
    //                 userRows,
    //                 articleRows,
    //                 commentInsertions
    //               ]);
    //             }
    //           );
    //         }
    //       );
    //     });
    // });

  //.then((insertedTopics, insertedUsers) =>)
