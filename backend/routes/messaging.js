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

    var message = {
        "name": req.body.owner,
	"email": req.body.email,
        "text": req.body.text
    }

    var sql = `INSERT INTO messages (userid, id, name, email, text) VALUES
    ((select id from mockUsers.users where mockUsers.users.email = '${message.email}'), uuid(), '${message.name}', '${message.email}', '${message.text}')`;

    connection.query(sql, function(error, result, fields) {
            if (error) throw error;
	    console.log(result);
	    res.json(req.body);
	    });
};

exports.getMessages = async function(req, res) {
    connection.query('select * from messages;', async function(error, results, fields) {
            if (error) throw error;
            console.log(results);
	    res.send(results);
        });
};

exports.getMessagesUserSpecific = async function(req, res) {
    var user = req.params.user;
    connection.query(`select * from messages where name = '${user}'`, async function(error, results, fields) {
            if (error) throw error;
            console.log(results);
	    res.send(results);
        });
};