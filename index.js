var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
var bcrypt = require('bcrypt');
//var snackbar = require('node-snackbar');
var session = require('express-session');
const saltRounds = 10;
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

//Connect to Postgres
var connectionString = process.env.DATABASE_URL || "postgres://fox19:Cunmiu1904@localhost:5432/NodeWorks2";
const pool = new Pool({connectionString: connectionString});

// function handleLoginRequest(req, res){
// 	pool.query("SELECT * FROM Users", function(err, result){
// 		if (err) {
// 			console.log("Cant handle database request");
// 			callback(err);
// 		}
// 		res.json(result.rows);
// 	});
// }

var app = express();

//View Engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Session Middleware
app.use(session({
  secret: 'fight on',
  resave: true,
  saveUninitialized: false
}));

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

//Authenticate User
app.post('/authenticate', function(req, res){
	const username = req.body.txtUser;
	const password = [req.body.txtPassword];
	pool.query("SELECT password_hash FROM Users where username = '$username'", function(err, hashedpass){

		// console.log(hashedpass);
		if (err) {
			//snackbar.show('Please Check Your Credentials');
			console.log('Wrong Username');
		}
			// bcrypt.compare(password.toString(), 'hashedpass', function(err, result){
			// 	if (result) {
			// 		//snackbar.show('Well Done');
			// 		console.log('Well Done');
			// 	}
			// 	else {console.log('Unmatched Credentials');}
			// })
			//snackbar.show('Failed to Login');
			//console.log('Something went wrong with validation');
		res.render('home');

		res.redirect('/home');
	})
})

//Redirect to Register Page
app.post('/register', function(req, res){
	return res.redirect('/register');
})

//Add User to Database
app.post('/createUser', function(req, res){
	const text = 'INSERT INTO Users(username, password_hash) VALUES($1, $2) RETURNING *';
	bcrypt.hash(req.body.txtPassword, saltRounds, function(err, hash){
		if (err) {
			console.log('something went wrong with hashing');
			throw err;
		}

		const newUser = [req.body.txtUser, hash];

		pool.query(text, newUser, (err, res) => {
  		if (err) {
    		console.log(err.stack)
  		} else {
    		console.log(res.rows[0])
  		}
		});
	})
})




  
