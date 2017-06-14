const users = require('../users.js');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE "user" CASCADE; ALTER SEQUENCE user_id_seq restart with 6;')
    .then(function() {
      return knex('user').insert(users);
    });
};
