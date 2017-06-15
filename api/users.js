const express = require('express');
const router = express.Router();
const queries = require('../db/queries/user_queries.js');

router.get('/', (req, res) => {
  queries
  .getAllUsers()
  .then(users => {
    res.json({
      users
    });
  });

});

router.get('/:id', (req, res) => {
  queries
  .getOneUser(req.params.id)
  .then(user => {
    res.json(user)
  });
});

router.post('/', (req, res, next) => {
  queries
  .createUser(req.body)
  .then(usersGames => {
    const newUser = usersGames[0];
    let userInstances = [];
    console.log(req.body.games);
    for (let i=0; i<req.body.games; i++) {
      userInstances.push({
        user_id: newUser.id,
        game_id: newUser.games[i]
      });
    }
    console.log(userInstances);
    });

    knex('user_game')
      .insert(userInstances);
      res.json(userInstances)
  });

router.put('/:id', (req, res, next) => {
  queries
  .updateUser(req.params.id, req.body)
  .then(user => {
    res.json(user[0])
  });
});

router.delete('/:id', (req, res) => {
  queries
  .deleteUser(req.params.id)
  .then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
