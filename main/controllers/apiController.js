var bodyParser = require('body-parser');
var mysql = require('mysql');
var host = process.env['HOST'] || 'localhost';
var user = process.env['USER'] || 'root';
var password = process.env['PASSWORD'] || 'abc!23';
var database = process.env['DATABASE'] || 'emails';
var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: host,
    user: user,
    password: password,
    database: database,
    debug: false
});

function getEmails(req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 500, "status": "Error in connection database" });
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from emails", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({ "code": 500, "status": "Error in connection database" });
            return;
        });
    });
}

function addEmails(req, res, newEmail) {

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var email = { email: newEmail };
        connection.query('INSERT INTO emails SET ?', email, function (err, rows) {
            connection.release();
             if(err) throw err;

            if (!err) {
                console.log('Last record insert id:', rows.insertId);
                res.json({ "code": 201, "status": "Created" });
            } else {
                console.log(err);
                res.json({ "code": 500, "status": "Error inserting database" });
            }
        });

        connection.on('error', function (err) {
            res.json({ "code": 500, "status": "Error in connection database" });
            return;
        });
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/emails', function (req, res) {
        console.log('GET /api/emails');
        getEmails(req, res);
    });

    app.post('/api/emails', function (req, res) {
        console.log('POST /api/emails with email: '+req.body.email);
        if(!validateEmail(req.body.email)){
            res.json({ "code": 500, "status": "Invalid email" });
            return;
        }
        addEmails(req, res, req.body.email);
    });
}