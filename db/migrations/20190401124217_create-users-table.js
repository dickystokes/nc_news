
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        console.log('create users')
        users.text('username').primary();
        users.text('avatar_url');
        users.text('name');
    })
    
  
};

exports.down = function(knex, Promise) {
    console.log('drop users')
    return knex.schema.dropTable('users');
  
};
