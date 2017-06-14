const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const users = require('./api/users');
const games = require('./api/games');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/users', users)
app.use('/api/games', games)

app.use(function(req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(function(err, req, res, next) {
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listenng on ${port}`);
})

module.exports = app;
