var http = require('http');
var fs = require('fs');

var jsonObj = {
	"name":"Phuong La","class":"cs313"
};
var jsontoString = JSON.stringify(jsonObj);

function onRequest(req, res){
	if (req.url == "/home") {
	fs.readFile("index.html", function(err, data){
	if(err){
      res.writeHead(404);
      res.write("Whatever you are looking for, it's not here, punk.");
   	}
   	else {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	}
	res.end();
	});
	}
	else if (req.url == "/getData") {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(jsontoString);
	}
	else {
	fs.readFile("prove01.html", function(err, data){
	if(err){
      res.writeHead(404);
      res.write("Whatever you are looking for, it's not here, punk.");
   	}
   	else {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	}
	res.end();
	});
	console.log(req.url);
}}

http.createServer(onRequest).listen(8888);
 
