var express = require('express');

var app = express();

app.use(express.static('public'));

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('*', function(req, res) {
  res.status(404);
  res.render('404');
})

var port = 3000;

app.listen(port);
console.log('listening on port...' + port);