const knex = require('../knex'); //the connection


module.exports = {
  getAllGames() {
  // return knex('user_game')
  //           .join('user', 'user.id', 'user_id')
  //           .join('game', 'game.id', 'game_id').select('user_game.id', "user_id", "game_id", "firstName", "lastName", "title", "year");
  return knex('user_game')
            .join('game', 'game.id', 'game_id')
            .select('user_game.id', "title", "year", "user_id");
},
getOneGame(num) {
  return knex('user_game').where('user_game.id', num).first()
          .join('game', 'game.id', 'game_id')
          .join('user', 'user.id', 'user_id')
          .select('user_game.id', "title", "year", "user_id");
},
createGame(userGame) {
  return knex('user_game')
          .insert(userGame, '*');
},
updateGame(id, newData) {
  return knex('user').where('user.id', id)
          .update(newData, '*');
},
deleteGame(id) {
  return knex('user_game')
          .where('user_game.id', id).del();
}
};
