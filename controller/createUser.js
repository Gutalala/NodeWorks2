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