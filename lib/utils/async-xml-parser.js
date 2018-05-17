'use strict';
const xml2js = require('xml2js');

const parseStringAsync = (file) => {
  const promise = new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(file, (err, result) => {
      !!err && reject(err)
      resolve(result);
    });
  });
  return promise;
};
module.exports = parseStringAsync;