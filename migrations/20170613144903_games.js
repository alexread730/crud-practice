
exports.up = function(knex, Promise) {
  return knex.schema.createTable('game', (table) => {
    table.increments().primary();
    table.text('title').notNull();
    table.integer('year').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('game');
};
