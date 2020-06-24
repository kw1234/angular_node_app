var mysql = require('mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'mockUsers'
    });

connection.connect(function(err){
        if(!err) {
            console.log("Users database is connected ... \n\n");
        } else {
            console.log(err);
            console.log("Error connecting to login database ... \n\n");
        }
    });


exports.register = async function(req, res) {

    const password = req.body.password;
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    var user = {
	"firstName": req.body.firstName,
	"lastName": req.body.lastName,
        "email": req.body.email,
        "password": encryptedPassword
    }

    var sql = `INSERT INTO users (id, firstName, lastName, email, password) VALUES
    (uuid(), '${user.firstName}', '${user.lastName}',  '${user.email}', '${user.password}')`;

    connection.query(sql, function(error, result, fields) {                                                                                            
            if (error) {
		sendRegistrationError(res, error);
	    }
	    console.log(user);
	    sendToken(user, res);
	});
};

exports.login = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('select * from users where email = ?', [email], async function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
		const comparison = await bcrypt.compare(password, results[0].password);
		console.log(comparison);

		if (comparison) {
		    sendToken(results[0], res);
		} else {
		    sendAuthError(res);
		}
	    } else {
		sendAuthError(res);
	    }
        });
};

exports.saveUser = async function(req, res) {

    var user = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email
    }

    console.log(user);

    var sql = `update users set firstName = '${user.firstName}', lastName = '${user.lastName}' where email = '${user.email}'`;

    connection.query(sql, function(error, result, fields) {
            if (error) sendSaveUserInfoError(res, error);
            //console.log(user);
            //sendToken(user, res);
	    res.send(req.body);
        });
};

exports.getUser = async function(req, res) {
    var email = req.user;
    var sql = `select firstName, lastName from users where email = '${email}'`;
    connection.query(sql, async function(error, results, fields) {
            if (error) throw error;
	    if (!results || results.length == 0) sendGetUserInfoError(res);
	    //sending results[0] because results comes wrapped in a list
            res.send(results[0]);
        });
};	

function sendToken(user, res) {
    // usually, would not hardcode this secret (the second param in the jwt.sign() call)
    // but, not sure how else to keep this secret so keeping it here for now
    var token = jwt.sign(user.email, '123');
    res.json({firstName: user.firstName, token});
}

function sendGetUserInfoError(res) {
    console.log("error in getting user info");
    return res.json({success: false, message: 'error in getting user info'});
}

function sendSaveUserInfoError(res) {
    console.log("error in saving user info");
    return res.json({success: false, message: 'error in saving user info'});
}

function sendAuthError(res) {
    console.log("error in auth");
    return res.json({success: false, message: 'email or password incorrect'});
}

function sendRegistrationError(res, error) {
    console.log("error in registration");
    return res.json({success: false, message: 'error in registering: '+error});
}