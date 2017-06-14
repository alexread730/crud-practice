const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res) => {
  queries
  .getAll()
  .then(usersGames => {
    res.json(usersGames)
  });

});

router.get('/:id', (req, res) => {
  queries
  .getOne(req.params.id)
  .then(usersGames => {
    res.json(usersGames)
  });
});

router.post('/', (req, res, next) => {
  queries
  .create(req.body)
  .then(usersGames => {
    res.json(usersGames[0])
  });
});

router.put('/:id', (req, res, next) => {
  queries
  .update(req.params.id, req.body)
  .then(usersGames => {
    res.json(usersGames[0])
  });
});

router.delete('/:id', (req, res) => {
  queries
  .delete(req.params.id)
  .then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
