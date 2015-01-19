var express = require('express');
var app = express();

// configure express
require('./server/express')(app);

// routes
require('./server/router')(app);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('listening on port...' + port);




