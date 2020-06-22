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
        "name": req.body.owner,
	"email": req.body.email,
        "text": req.body.text
    }

    console.log(message);

    var sql = `INSERT INTO messages (email, text, name) VALUES (${message.email}, ${message.text}, ${message.name})`;

    connection.query(sql, function(error, results, fields) {
            if (error) {
                res.send({
                        "code":400, "failed":"error occurred"
                    });
            } else {
                res.send({
                        "code": 200,
                        "success": "message added successfully"
                    });
            }
	    });
};