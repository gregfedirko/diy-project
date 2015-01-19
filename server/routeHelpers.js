var request = require('request');

module.exports = {

  paginatedRequest: paginatedRequest,
  specificRequest: specificRequest,
  handleError: handleError

};


function paginatedRequest(optionsMap, callback) {

  var size = optionsMap.size || 5;
  var offset = optionsMap.offset || 0;

  var url = optionsMap.baseUrl.concat(optionsMap.apiRoute, '?', 'limit=', size, '&', 'offset=', offset);

  request(url, function(error, response, body) {
    if (error) { console.log(error);}

      var parsedBody = JSON.parse(body);
      callback(error, parsedBody);
  });

}

function specificRequest(optionsMap, callback) {
  var url = optionsMap.baseUrl.concat(optionsMap.apiRoute, '/', optionsMap.id);
  request(url, function(error, response, body) {
    if (error) { console.log(error); }

    var parsedBody = JSON.parse(body);
    callback(error, parsedBody);
  });
}

function handleError(res, code) {
  res.status(code);
  res.render('error', {code: code});
}




