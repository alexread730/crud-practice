const express = require('express');
const router = express.Router();
const queries = require('../db/queries/user_queries.js');
const knex = require('../db/knex');


function isValidUser(user) {
  let userPresent = typeof user == 'string' && user.firstName.trim() != '';
}
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
    res.json({
      user
    })
  });
});

router.post('/', (req, res, next) => {
  queries
  .createUser(req.body)
  .then(user => {
    res.json(user[0])
    let promises = [];
      for (let i = 0; i < req.body.games.length; i++) {
          promises.push(knex('user_game')
              .insert({
                user_id: user[0].id,
                game_id: req.body.games[i]
              }, '*'));
            }
      return Promise
              .all(promises);
  });
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
