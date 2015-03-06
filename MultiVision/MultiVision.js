var express = require("express"),
    stylus = require('stylus'), 
    logger = require('morgan'),
    bodyparser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
  return stylus(str).set('fileame', path);

};

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyparser());
app.use(stylus.middleware(
  {
    src: __dirname + '/public', 
    compile: compile
  }
));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
  res.render('index');
});

var port = 8080;

app.listen(port);

console.log("Listening on port " + port + "...");