var express = require('express');
var request = require('request');

var app = express();

app.use(express.static('public'));

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var diyConfig = {
  url: 'http://api.diy.org'
};

app.get('/', function(req, res) {

  var requestMap = {
    baseUrl: diyConfig.url,
    apiRoute: '/explore/featured',
    size: 12,
    offset: 0
  };

  paginatedRequest(requestMap, function(body) {
    var data = {
      featured: body.response
    };
    res.render('index', data);
  });

});

app.get('/maker/:id', function(req, res) {

  var requestMap = {
    baseUrl: diyConfig.url,
    apiRoute: '/makers',
    id: req.params.id
  };
  specificRequest( requestMap, function(body) {
    var data = {
      maker: body.response
    };
    res.render('maker', data);
  });

});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('*', function(req, res) {
  res.status(404);
  res.render('404');
});

var port = 3000;

app.listen(port);
console.log('listening on port...' + port);


function paginatedRequest(optionsMap, callback) {

  var size = optionsMap.size || 5;
  var offset = optionsMap.offset || 0;

  var url = optionsMap.baseUrl.concat(optionsMap.apiRoute, '?', 'limit=', size, '&', 'offset=', offset);

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedBody = JSON.parse(body);
      callback(parsedBody);
    }
  });

}

function specificRequest(optionsMap, callback) {
  var url = optionsMap.baseUrl.concat(optionsMap.apiRoute, '/', optionsMap.id);
  console.log(url);
  request(url, function(error, response, body) {
    if (error) { console.log(error); }

    var parsedBody = JSON.parse(body);
    console.log(parsedBody);

    callback(parsedBody);
  });
}

