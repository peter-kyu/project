/**
 * Module dependencies.
 */

var express = require('express'),
    connect = require('connect'),
    http    = require('http'),
    path    = require('path'),
    db      = require('./models');
//var mysql = require('mysql');
var app     = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(connect.favicon());
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());
app.use(connect.methodOverride());
app.use(connect.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(connect.errorHandler());
}


/*
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'dkanehTmwlak'
});
connection.connect(function(error){
    if (error) {
        console.log(error);
        console.log('database connection error');
    }
});
*/

require('./routing')(app);

db
    .sequelize
    .sync({ force: false})
    .complete(function(err) {
        if (err) {
            throw err[0];
        } else {
            http
                .createServer(app)
                .listen(app.get('port'), function() {
                        console.log('Express server listening on port ' + app.get('port'));
                    }
                );
        }
    });




