var express = require('express');
var app = express();
messages = [{text:'lala', owner: 'Mola'}, {text: 'bosa', owner: 'meeshu'}];


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
    })

app.get('/messages', (req, res) => {
	res.send(messages);
    });

app.listen(1234);