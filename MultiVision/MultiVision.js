var express = require("express"),
    stylus = require('stylus'), 
    logger = require('morgan'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
  return stylus(str).set('fileame', path);

};

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));

//The following two lines added per his instructions on github
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(bodyparser());
app.use(stylus.middleware(
  {
    src: __dirname + '/public', 
    compile: compile
  }
));

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res){
  res.render('partials/' + req.params.partialPath);

});

app.get('*', function(req, res){
  res.render('index');
});

var port = 8080;

app.listen(port);

console.log("Listening on port " + port + "...");