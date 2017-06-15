const knex = require('../knex'); //the connection

function getUserswithGames() {
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
                usersByName[user.firstName].games.push(user.title);
              });
              return usersWithGames;
            });
}

module.exports = {
  getAllUsers() {
    return getUserswithGames();

  },
  getOneUser(num) {
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
                  usersByName[user.firstName].games.push(user.title);

                });
                return usersWithGames.find(user => {
                  return user.id == num;
                });
              });
  },
  createUser(person) {
    return knex('user')
            .insert({
            firstName: person.firstName,
            lastName: person.lastName}, '*');

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
