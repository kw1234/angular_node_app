var express = require('express');
var app = express();
var login = require('./routes/login');
var path = require('path');
var messaging = require('./routes/messaging');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// need this to make sense of the body of requests being Posted
app.use(bodyParser.json());

app.use(express.static('dist/frontend'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
    });

//create separate routers for api and auth so that the prefixes 'api/' and 'auth/' will be handled by different routers
var api = express.Router();
var auth = express.Router();

app.get('/', function(req, res) {
	res.redirect('/');
    });

api.get('/messages', messaging.getMessages);

api.get('/messages/:user', messaging.getMessagesUserSpecific);

api.post('/messages', messaging.addMessage);

// these two below methods need to be updated to use mysql
api.get('/users/me', checkAuthenticated, login.getUser);

api.post('/users/me', checkAuthenticated, login.saveUser);

auth.post('/login', login.login);

auth.post('/register', login.register);

function sendToken(user, res) {
    // usually, would not hardcode this secret                                                                                                           
    var token = jwt.sign(user.id, '123');
    res.json({firstName: user.firstName, token});
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

app.listen(8080);