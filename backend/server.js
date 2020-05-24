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
    })

app.get('/messages', (req, res) => {
	res.send(messages);
    });

app.post('/message', (req, res) => {
        console.log(req.body);
	// need to add a send status back or the Rest request will just hang forever
	res.sendStatus(200);
    });

app.listen(1234);