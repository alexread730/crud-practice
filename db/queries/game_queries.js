const knex = require('../knex'); //the connection

function getGamesWithUsers() {
  return knex('user_game')
            .join('user', 'user.id', 'user_id')
            .join('game', 'game.id', 'game_id')
            .select('user_game.id', "game_id", "title", "year", "title", "firstName", "lastName")
            .then(
              users => {
              const gamesWithUsers = [];
              const gamesByTitle = {};
              console.log(users);
              users.forEach(game => {
                if(!gamesByTitle[game.title]) {
                  const gameWithPeople = {
                    id: game.game_id,
                    title: game.title,
                    year: game.year,
                    users: []
                  };
                  gamesWithUsers.push(gameWithPeople);
                  gamesByTitle[game.title] = gameWithPeople

                };
                gamesByTitle[game.title].users.push(game.firstName + " " + game.lastName);
              });
              return gamesWithUsers;
            }
          );
}

module.exports = {
  getAllGames() {
    return getGamesWithUsers();

  },
  getOneGame(num) {
    return knex('user_game')
              .join('user', 'user.id', 'user_id')
              .join('game', 'game.id', 'game_id')
              .select('user_game.id', "game_id", "title", "year", "title", "firstName", "lastName")
              .then(users => {
                const gamesWithUsers = [];
                const gamesByTitle = {};
                users.forEach(game => {
                  if(!gamesByTitle[game.title]) {
                    const gameWithPeople = {
                      id: game.game_id,
                      title: game.title,
                      year: game.year,
                      users: []
                    };
                    gamesWithUsers.push(gameWithPeople);
                    gamesByTitle[game.title] = gameWithPeople

                  };
                  gamesByTitle[game.title].users.push(game.firstName + " " + game.lastName);
                });
                return gamesWithUsers.find(game => {
                  return game.id == num;
                });;
              });
  },
  createGame(game) {
    return knex('game')
              .insert();

  },
  updateGame(id, newData) {
    return knex('game').where('user.id', id)
            .update(newData, '*');
  },
  deleteGame(id) {
    return knex('game')
            .where('game.id', id).del();
  }
}
