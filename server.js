var express = require('express');
var app = express();
var path = require('path');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/video/index.html'));
    app.use(express.static(__dirname + '/video'));

});



port= 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))