const express         = require('express');
const http            = require('http');
const port            = 9000;
const app             = express();
const server          = http.Server(app);

server.listen( port );
console.log('Game running on localhost:9000');

app.get( '/', function( req, res ){
    res.sendfile( __dirname + '/index.html' );
});

app.get('/assets/player/*', (req, res) => {
  res.sendFile(`${__dirname}/assets/player/${req.params[0]}`);
});

app.get('/assets/ships/*', (req, res) => {
  res.sendFile(`${__dirname}/assets/ships/${req.params[0]}`);
});

app.get('/assets/sounds/*', (req, res) => {
  res.sendFile(`${__dirname}/assets/sounds/${req.params[0]}`);
});

app.get('/assets/*', (req, res) => {
  res.sendFile(`${__dirname}/assets/${req.params[0]}`);
});

app.get('/scripts/data/*', (req, res) => {
  res.sendFile(`${__dirname}/scripts/data/${req.params[0]}`);
});

app.get('/scripts/state/*', (req, res) => {
  res.sendFile(`${__dirname}/scripts/state/${req.params[0]}`);
});

app.get('/scripts/ui/*', (req, res) => {
  res.sendFile(`${__dirname}/scripts/ui/${req.params[0]}`);
});

app.get('/scripts/utils/*', (req, res) => {
  res.sendFile(`${__dirname}/scripts/utils/${req.params[0]}`);
});

app.get('/scripts/game_loop.js', (req, res) => {
  res.sendFile(`${__dirname}/scripts/game_loop.js`);
});

app.get('/styles/*', (req, res) => {
  res.sendFile(`${__dirname}/styles/styles.css`);
});
