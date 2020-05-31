var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var messages = [{text:'lala', owner: 'Mola'}, {text: 'bosa', owner: 'meeshu'}];
var users = []

// need this to make sense of the body of requests being Posted
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
    });

//create separate routers for api and auth so that the prefixes 'api/' and 'auth/' will be handled by different routers
var api = express.Router();
var auth = express.Router();

api.get('/messages', (req, res) => {
	res.send(messages);
    });

api.get('/messages/:user', (req, res) => {
	var user = req.params.user;
	var result = messages.filter(message => message.owner == user);
        res.json(result);
    });

api.post('/messages', (req, res) => {
        //console.log(req.body);
	messages.push(req.body);
	// need to add a send status back or the Rest request will just hang forever
	res.json(req.body);
    });

auth.post('/register', (req, res) => {
        var index = users.push(req.body) - 1;

        var user = users[index];
        user.id = index;
        // usually, would not hardcode this secret
        var token = jwt.sign(user.id, '123');
        res.json(token);
    });

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);