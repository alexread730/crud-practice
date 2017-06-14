
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_game', (table) => {
    table.increments().primary();
    table.integer('user_id').unsigned();
    table.integer('game_id').unsigned();
    table.foreign('user_id').references('user.id');
    table.foreign('game_id').references('game.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_game');
};
