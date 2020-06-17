var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var messages = [{text:'lala', owner: 'Mola'}, {text: 'bosa', owner: 'meeshu'}];
var users = [{firstName: 'a', email: 'a', password: 'a', id: 0}]

// need this to make sense of the body of requests being Posted
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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


api.get('/users/me', checkAuthenticated, (req,res) => {
	res.json(users[req.user]);
    });

api.post('/users/me', checkAuthenticated, (req,res) => {
	var user = users[req.user];

	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;

	res.json(user);
    });

auth.post('/login', (req, res) => {
        var user = users.find(user => user.email == req.body.email);
	console.log(users);
	if (!user) 
	    sendAuthError(res);

	if (user.password == req.body.password)
	    sendToken(user, res);
	else
	    sendAuthError(res);
    });

auth.post('/register', (req, res) => {
        var index = users.push(req.body) - 1;
	console.log(users);

        var user = users[index];
        user.id = index;

	sendToken(user, res);
    });

function sendToken(user, res) {
    // usually, would not hardcode this secret  
    var token = jwt.sign(user.id, '123');
    res.json({firstName: user.firstName, token});
}

function sendAuthError(res) {
    console.log("error in auth");
    return res.json({success: false, message: 'email or password incorrect'});
}

function checkAuthenticated(req, res, next) {
    if (!req.header('authorization')) {
	return res.status(401).send({message: 'Unauthorized request. Missing authentication header'});
    }

    var token = req.header('authorization').split(' ')[1];
    var payload = jwt.decode(token, '123');

    if (!payload) {
	return res.status(401).send({message: 'Unauthorized request. Authentication header is invalid'});
    }

    req.user = payload;

    next();
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);