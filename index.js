var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
var bcrypt = require('bcrypt');
const saltRounds = 10;
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

//Connect to Postgres
var connectionString = process.env.DATABASE_URL || "postgres://fox19:Cunmiu1904@localhost:5432/NodeWorks";
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
app.listen(PORT, function() {
  	console.log(`Listening on ${ PORT }`);
  }) 

//Home Page
app.get('/', function(req, res){
	res.render('index');
})

//Render Login Page
app.get('/login', function(req, res){
	res.render('login');
})

//Render Register Page
app.get('/register', function(req, res){
	res.render('register');
})

//Redirect to Login Page
app.post('/login', function(req, res){
	return res.redirect('/login');
})

//Redirect to Register Page
app.post('/register', function(req, res){
	return res.redirect('/register');
})



  
