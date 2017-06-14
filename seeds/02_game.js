const games = require('../games.js');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE game CASCADE; ALTER SEQUENCE game_id_seq restart with 6;')
    .then(function() {
      return knex('game').insert(games);
    });
};
