#!/usr/bin/node

const filePath = process.argv[2];
const fs = require('fs');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
