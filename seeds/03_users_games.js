const users_games = require('../users_games.js');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE user_game RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('user_game').insert(users_games);
    });
};
