var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

//Connect to Postgres
var connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function handleLoginRequest(req, res){
	pool.query("SELECT * FROM Users", function(err, result){
		if (err) {
			throw err;
			console.log("Cant handle database request");
		}
		res.json(result.rows);
	});
}

var app = express()
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('index'))
  //.get('/cool', (req, res) => res.send(cool()))

//View Engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', handleLoginRequest)



  app.listen(PORT, function() {
  	console.log(`Listening on ${ PORT }`);
  }) 
