#!/usr/bin/node

const request = require('request');

const url = process.argv[2];
const filePath = process.argv[3];
const fs = require('fs');

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});
