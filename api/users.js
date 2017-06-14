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
    res.json(usersGames[0])
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
