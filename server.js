
//var s3_upload_fileExchange = require('./s3_upload_fileExchange.js');
var s3_upload_stream = require('./s3_upload_stream.js');
var kafkajs = require('./kafkajs.js');

var express = require('express');
var app = express();
var path = require('path');

bodyParser = require('body-parser');

app.use(express.json({limit: '500mb'}));
app.use(bodyParser.json());

let time_now=null;
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
    app.use(express.static(__dirname + '/app'));

    time_now= new Date().getTime();
});

// app.get('/api/', function (req, res) {
//     data= { "index":"0", "get":"success" }
//     res.send(data)

// })

app.post('/api/', function (req, res) {

    data_res= { "index":"0", "post":"success" }
    res.send(data_res)

    let data_req= req.body;


    //console.log("req->data->", data_req);
    //console.log("req->base64->", base64);
    //s3_upload_fileExchange.s3_upload(data_req);
    phq8_score= 23
    session_id= gen_session(phq8_score);//phq8_score

    console.log('\n\n----------------------stream', data_req.id ,'------------------------------');
    // kafka
    let data= data_req;
    data.session_id= session_id;
    data.phq8_score= phq8_score;
    if(data.id!="full.webm"){
        kafkajs.producer(data);
    }

    // s3 upload
    let base64= data_req.base64;
    let id= data_req.id;
    s3_upload_stream.s3_upload(base64, id, session_id);


})

port= 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


function gen_session(phq8_score){
    session_id= time_now + '_' + phq8_score
    console.log("session_id", session_id);
    return session_id;
}






