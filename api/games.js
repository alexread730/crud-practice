const express = require('express');
const router = express.Router();
const queries = require('../db/queries/game_queries.js');
const knex = require('../db/knex');

router.get('/', (req, res) => {
  queries
  .getAllGames()
  .then(games => {
    res.json({
      games
    });
  });

});

router.get('/:id', (req, res) => {
  queries
  .getOneGame(req.params.id)
  .then(game => {
    res.json(game)
  });
});

router.post('/', (req, res, next) => {
  queries
  .createGame(req.body)
  .then(game => {
    res.json(game[0])
    let promises = [];
      for (let i = 0; i < req.body.users.length; i++) {
          promises.push(knex('user_game')
              .insert({
                game_id: game[0].id,
                user_id: req.body.users[i]
              }, '*'));
            }
      return Promise
              .all(promises);
  });
});

router.put('/:id', (req, res, next) => {
  queries
  .updateGame(req.params.id, req.body)
  .then(game => {
    res.json(game[0])
  });
});

router.delete('/:id', (req, res) => {
  queries
  .deleteGame(req.params.id)
  .then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
