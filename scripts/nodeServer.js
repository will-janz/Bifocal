/**
 * NodeJS web server
 * Uses express (expressjs.com)
 * Currently runs on port 80 and thus requires elevated privileges to run
 */

var express = require('express');
var http = require('http');
var app = express();

/* Routing */
// API routing
app.get('/tempAPI/:thingUserWantsFromThetempAPI', function(req, res) {
    res.sendfile('./app/tempAPI/' + req.params.thingUserWantsFromThetempAPI);
});

// File routing
app.get(/^\/([a-zA-Z0-9\._\/-]+)\.([a-zA-Z0-9]{2,4})$/, function(req, res) {
    res.sendfile('./app/' + req.params[0] + '.' + req.params[1]);
});

// Page routing
app.get(/\/([^.]+)?$/, function(req, res) {
    // Used for HTML5 Angular routing
    res.sendfile("./app/index.html");
});

app.listen(80); // in production this must be run as sudo. Cloud OS requires root privilage to listen on this port.
console.log("Server started on port 80");