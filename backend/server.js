var express = require('express');
var app = express();
var bodyParser = require('body-parser');

messages = [{text:'lala', owner: 'Mola'}, {text: 'bosa', owner: 'meeshu'}];

// need this to make sense of the body of requests being Posted
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
    });

var api = express.Router();

api.get('/messages', (req, res) => {
	res.send(messages);
    });

api.post('/messages', (req, res) => {
        //console.log(req.body);
	messages.push(req.body);
	// need to add a send status back or the Rest request will just hang forever
	res.json(req.body);
    });

app.use('/api', api);

app.listen(63145);