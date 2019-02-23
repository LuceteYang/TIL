'use strict';

const http = require('http');
const https = require('https');
const querystring = require('querystring');

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const Sharp = require('sharp');

// set the S3 and API GW endpoints
const BUCKET = '<your bucket name>';

exports.handler = (event, context, callback) => {
  let response = event.Records[0].cf.response;

  console.log("Response status code :%s", response.status);

  //check if image is not present
  if (response.status == 200) {

    let request = event.Records[0].cf.request;
    let params = querystring.parse(request.querystring);
    let path = request.uri;
    let key = path.substring(1);
    console.log('path',path); // /hamburg-3846525_640.jpg
    console.log('params',params); // { d: '100x100' }
    // if there is no dimension attribute, just pass the response
    if (!params.d) {
      callback(null, response);
      return;
    }

    // read the dimension parameter value = width x height and split it by 'x'
    let dimensionMatch = params.d.split("x");

    let width, height;

    width = parseInt(dimensionMatch[0], 10);
    height = parseInt(dimensionMatch[1], 10);

    if(!(Number.isInteger(width)&&Number.isInteger(height))){
      console.log("parse error..","height",height,"width",width);
      callback(null, response);
      return
    }
    // get the source image file
    S3.getObject({ Bucket: BUCKET, Key: key }).promise()
      // perform the resize operation
      .then(data => Sharp(data.Body)
        .resize(width, height)
        .toBuffer()
      )
      .then(buffer => {
        // generate a binary response with resized image
        response.status = 200;
        response.body = buffer.toString('base64');
        response.bodyEncoding = 'base64';
        response.headers['content-type'] = [{ key: 'Content-Type', value: 'image/jpg' }];
        callback(null, response);
      })
    .catch( err => {
      console.log("Exception while reading source image :%j",err);
      callback(null, response);
    });
  } // end of if block checking response statusCode
  else {
    // allow the response to pass through
    callback(null, response);
  }
};
