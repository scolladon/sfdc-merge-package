'use strict';
const fs = require('fs');

const readFileAsync = (file) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      !!err && reject(err)
      resolve({'name':file,'content':data});
    });
  });
  return promise;
};
module.exports = readFileAsync;