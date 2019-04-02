
exports.up = function(knex, Promise) {
    console.log('create articles')
    return knex.schema.createTable('articles', articles => {
        articles.increments('article_id').primary()
        articles.text('title')
        articles.text('body')
        articles.integer('votes').defaultTo(0)
        articles.text('topic').references('topics.slug').onDelete('cascade')
        articles.text('author').references('users.username').onDelete('cascade')
        articles.timestamp('created_at').defaultTo(knex.fn.now())
    })
  
};

exports.down = function(knex, Promise) {
    console.log('drop articles')
    return knex.schema.dropTable('articles');
  
};
