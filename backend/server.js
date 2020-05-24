var express = require('express');
var app = express();
messages = [{text:'lala', owner: 'Mola'}, {text: 'bosa', owner: 'meeshu'}];

app.get('/messages', (req, res) => {
	res.send(messages);
    });

app.listen(1234);