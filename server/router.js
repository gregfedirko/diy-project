var helpers = require('./routeHelpers.js');
var config = require('./config.js');

module.exports = function(app) {
  app.get('/', function(req, res) {

    var requestMap = {
      baseUrl: config.apiBaseUrl,
      apiRoute: '/explore/featured',
      size: 12,
      offset: 0
    };

    helpers.paginatedRequest(requestMap, function(error, body) {
      var code = body.head.code;
      if (code !== 200) {
        helpers.handleError(res, code);
        return;
      };

      var data = {
        featured: body.response
      };
      res.render('index', data);
    });

  });

  app.get('/maker/:id', function(req, res) {

    var requestMap = {
      baseUrl: config.apiBaseUrl,
      apiRoute: '/makers',
      id: req.params.id
    };
    
    helpers.specificRequest( requestMap, function(error, body) {
      var code = body.head.code;
      if (code !== 200) {
        helpers.handleError(res, code);
        return;
      };

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
    helpers.handleError(res, 404);
  });

}