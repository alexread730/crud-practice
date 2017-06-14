
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments().primary();
    table.text('firstName').notNull();
    table.text('lastName').notNull;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
