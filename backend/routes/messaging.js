var mysql = require('mysql');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'mockMessages'
    });

connection.connect(function(err){
        if(!err) {
            console.log("Messaging database is connected ... \n\n");
        } else {
            console.log(err);
            console.log("Error connecting to messaging database ... \n\n");
        }
    });


exports.addMessage = async function(req, res) {

    //console.log(req.body);

    var message = {
	"userid": req.body.userId,
	"id": req.body.messageId,
        "name": req.body.owner,
	"email": req.body.email,
        "text": req.body.text
    }

    console.log(message);

    var sql = `INSERT INTO messages (userid, id, name, email, text) VALUES
    ('${message.userid}', '${message.id}', '${message.name}', '${message.name}', '${message.text}')`;

    console.log(sql);

    /*connection.query(sql, function(error, result, fields) {
            if (error) throw error;
	    console.log(result);
	    });*/
};

exports.getMessages = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('select * from users where email = ?', [email], async function(error, results, fields) {
            if (error) throw error;
            console.log(results[0].password);
        });
};