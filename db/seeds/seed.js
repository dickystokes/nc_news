const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data/index");

const {articlesReformatter} = require('../utils/date-reformatter')
const {commentsReformatter} = require('../utils/comments-reformatter')

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
          console.log(topicsRows.length, usersRows.length)
          return knex('articles')
          .insert(articlesReformatter(articlesData))
          .returning('*')
        })
        .then(articleRows => {
          console.log(articleRows.length)
          return knex('comments')
          .insert(commentsReformatter(commentsData, articleRows))
          .returning('*')
        }).then((commentRows) => {
          console.log(commentRows.length)
        })

    })
}
