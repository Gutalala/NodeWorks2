var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5000;

var app = express()
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('index'))
  //.get('/cool', (req, res) => res.send(cool()))

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// var logger = function(req, res){
// 	console.log('I\'m really really good');
// }

// app.use(logger);

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

  app.listen(PORT, function() {
  	console.log(`Listening on ${ PORT }`);
  }) 

  app.get('/', function(req, res){
  	res.send("hello guys");
  })