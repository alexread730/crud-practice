const knex = require('./knex'); //the connection

module.exports = {
  getAll() {
    return knex('user_game')
              .join('user', 'user.id', 'user_id')
              .join('game', 'game.id', 'game_id');
  },
  getOne(num) {
    return knex('user_game').where('user_game.id', num).first()
            .join('user', 'user.id', 'user_id')
            .join('game', 'game.id', 'game_id');
  },
  create(userGame) {
    return knex('user_game').insert(userGame, '*');
  },
  update(id, userGame) {
    return knex('user_game').where('user_game.id', id).update(userGame, '*');
  },
  delete(id) {
    return knex('user_game').where('user_game.id', id).del();
  }
}
