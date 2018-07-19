var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5000;

var app = express()
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('index'))
  //.get('/cool', (req, res) => res.send(cool()))

//Body Parser Middleware


var logger = function(req, res){
	console.log('Im really really good');
}

app.use(logger);

  app.get()

  app.listen(PORT, function() {
  	console.log(`Listening on ${ PORT }`);
  }) 