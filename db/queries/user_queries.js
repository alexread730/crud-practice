const knex = require('../knex'); //the connection

module.exports = {
  getAllUsers() {
    // return knex('user_game')
    //           .join('user', 'user.id', 'user_id')
    //           .join('game', 'game.id', 'game_id').select('user_game.id', "user_id", "game_id", "firstName", "lastName", "title", "year");
    return knex('user_game')
              .join('user', 'user.id', 'user_id')
              .join('game', 'game.id', 'game_id')
              .select('user_game.id', "user_id", "firstName", "lastName", "title")
              .then(users => {
                const usersWithGames = [];
                const usersByName = {};

                users.forEach(user => {
                  if(!usersByName[user.firstName]) {
                    const personWithGames = {
                      id: user.user_id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      games: []
                    };
                    usersWithGames.push(personWithGames);
                    usersByName[user.firstName] = personWithGames

                  };
                  console.log(user);
                  usersByName[user.firstName].games.push(user.title);

                });
                return usersWithGames;
              });
  },
  getOneUser(num) {
    return knex('user_game').where('user_game.id', num).first()
            .join('user', 'user.id', 'user_id')
            .join('game', 'game.id', 'game_id')
            .select('user_game.id', "firstName", "lastName", "title", "year");
  },
  createUser(person) {
    return knex('user')
            .insert(person, '*');
  },
  updateUser(id, newData) {
    return knex('user').where('user.id', id)
            .update(newData, '*');
  },
  deleteUser(id) {
    return knex('user_game')
            .where('user_game.id', id).del();
  }
}
