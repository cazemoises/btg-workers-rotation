const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const database = new sqlite3.Database('dbworkersrotation.db') //new instance to get database
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const hostname = '127.0.0.1'
const port = process.env.PORT || 8080;
const DBPATH = 'backend/dbworkersrotation.db';
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("frontend/html"));

// SELECTS
// get all users
app.get('/get-users', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "SELECT * FROM user ORDER BY person_cpf COLLATE NOCASE"
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/get-seats-by-status', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = `SELECT * FROM seat WHERE status = ${req.body.status} ORDER BY person_cpf COLLATE NOCASE`
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


// POSTS
// save a new person
app.post('/save-new-person', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    sql = "INSERT INTO person (cpf,name) VALUES ('" + req.body.cpf + "', '" + req.body.name + "')";
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    res.json();
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
    });
    db.close(); // Fecha o banco
    res.end();
});

// save a new user
app.post('/register-user', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "INSERT INTO user (email, person_cpf, pass, status) VALUES ('" + req.body.email + "', '" + req.body.person_cpf + "', '" + req.body.pass + "' , '" + req.body.status + "')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.listen(process.env.PORT || port, function() {
    console.log(`Server listening on port http://${hostname}:${port}`);
    });