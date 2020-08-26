
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html

require('dotenv').config()
accessKeyId= process.env.ACCESSKEYID;
secretAccessKey= process.env.SECRETACCESSKEY;

console.log("ACCESSKEYID ", accessKeyId);
console.log("SECRETACCESSKEY ", secretAccessKey);

function aws_s3_upload_file(Bucket, Prekey, filename){
  // const Bucket= 'ml-data-warehouse-test';
  // const Prekey= 'phq8/';
  // const file= 'hunter.wav';//path
  
  // file= filename.split("/")[-1];

  filenames= filename.split("/")
  console.log( filenames[filenames.length-1] );

  var AWS = require('aws-sdk');
  AWS.config.update({
    region: 'us-east-1', 
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  s3 = new AWS.S3({apiVersion: '2006-03-01'});

  // var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
  // var file = process.argv[3];

  //const Bucket= 'thrivee-dev';


  var uploadParams = {Bucket: Bucket, Key: '', Body: ''};

  var fs = require('fs');
  // var fileStream = fs.createReadStream('tmp/' + file);
  var fileStream = fs.createReadStream(filename);

  fileStream.on('error', function(err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  // var path = require('path');
  // uploadParams.Key = path.basename(file);

  uploadParams.Key = Prekey + "full.webm";
  // uploadParams.Key = "foo.txt";
  // uploadParams.Body = "this is hunter";
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

function save_local_file(data) {
  console.log("video_upload_file...");
  const fs = require('fs');
  let buff = new Buffer(data.base64, 'base64'); //binary stream
  const filename= "./tmp/"+ data.id;
  fs.writeFileSync(filename, buff);
  console.log(filename);
}

module.exports = {
  s3_upload:function main(data){
    save_local_file(data);

    console.log("s3_upload....");
    const Bucket= 'ml-data-warehouse-test';
    const Prekey= 'phq8/';
    const filename= 'tmp/full.webm';//path
    aws_s3_upload_file(Bucket, Prekey, filename);
  }
}


