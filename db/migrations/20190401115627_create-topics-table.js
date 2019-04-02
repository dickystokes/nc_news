
exports.up = function(knex, Promise) {
    return knex.schema.createTable('topics', topics => {
        console.log('create topics')
        topics.string('slug').primary().unique();
        topics.text('description');
    })
  
};

exports.down = function(knex, Promise) {
    console.log('drop topics')
    return knex.schema.dropTable('topics');
  
};
