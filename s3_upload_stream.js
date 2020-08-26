
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html

require('dotenv').config()
accessKeyId= process.env.ACCESSKEYID;
secretAccessKey= process.env.SECRETACCESSKEY;

console.log("ACCESSKEYID ", accessKeyId);
console.log("SECRETACCESSKEY ", secretAccessKey);

function aws_s3_upload_file(Bucket, Prekey, S3_key, fileStream){

  var AWS = require('aws-sdk');
  AWS.config.update({
    region: 'us-east-1', 
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  s3 = new AWS.S3({apiVersion: '2006-03-01'});

  var uploadParams = {Bucket: Bucket, Key: '', Body: ''};

  uploadParams.Body = fileStream;

  uploadParams.Key = Prekey + S3_key;
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

module.exports = {
  s3_upload:function main(base64, id, session_id){
    console.log("\ns3_upload_stream....");
    const S3_Bucket= 'ml-data-warehouse-test';
    const S3_Prekey= 'phq8/' + session_id + '/';
    const S3_key= id;

    let buff = new Buffer(base64, 'base64'); //binary stream
    aws_s3_upload_file(S3_Bucket, S3_Prekey, S3_key, buff);
  }
}


