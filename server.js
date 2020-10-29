
//var s3_upload_fileExchange = require('./s3_upload_fileExchange.js');
var s3_upload_stream = require('./s3_upload_stream.js');
var kafkajs = require('./kafkajs.js');
const mongoose = require("mongoose");

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

app.post('/api/post/stream', function (req, res) {

    data_res= { "index":"0", "post":"success" }
    res.send(data_res)

    let data_req= req.body;
    console.log('\n\n----------------------stream------------------------------');
    let data= data_req;

    let topic= data_req.topic;
    let group= data_req.group;
    let stream_id= data_req.stream_id;
    let stream_timestamp= data_req.stream_timestamp;
    let url= data_req.url;
    let base64= data_req.base64;

    console.log("topic:", topic);
    console.log("group:", group);
    console.log("stream_id:", stream_id);
    console.log("stream_timestamp:", stream_timestamp);

    kafkajs.producer(data);

    // s3 upload
    // s3_upload_stream.s3_upload(base64, id, session_id);
})

let username='kaden';
let password='1234';
let uri = "mongodb://" + username + ":" + password + "@54.87.133.19:27017/" 
// http://localhost:3000/api/transcribe/aws-transcribe-result-test-tmp/col

app.get('/api/get/transcribe/:db_name/:collection_name', (req, res) => {
  // db_name= 'ml-test';
  // collection_name='col1';
  db_name= req.params.db_name;
  collection_name= req.params.collection_name;

  var URI = uri + db_name;
  console.log(URI);

  mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
  const connection = mongoose.connection;

  connection.once("open", function() {
    console.log(db_name, "connected");

    connection.db.collection(collection_name, function(err, collection){
      collection.find({}).toArray(function(err, data){
          console.log(data); 
          connection.close();
          console.log("close");
          res.send(data);
        })
    });
  });

  // res.send('Your id is ' + req.params.id + '\n');
});

port= 80
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
console.log("Record Video App");

