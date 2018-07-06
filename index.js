
var Keycloak = require('keycloak-connect');
var express = require('express');
var session = require('express-session');

var app = express();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Demo app listening at http://%s:%s', host, port);
});


// Serve / as index.html publicly.
app.use('/', express.static('public'))


// Store for session stuff for express and keycloak
var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Init keycloak, give access to session data
var keycloak = new Keycloak({
  store: memoryStore
});

// Install keycloak middleware.
app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/protected', keycloak.protect(), function (req, res) {
    res.send('Secret data');
});
 
 app.get('/unprotected', function (req, res) {
    res.send('Public data');
});

app.get('/login', keycloak.protect(), function (req, res) {
  res.redirect('/');
});