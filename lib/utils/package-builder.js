'use strict';
const xmlbuilder = require('xmlbuilder');

const packageBuilder = (pkg) => {
  const xml = xmlbuilder.create('Package')
  .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
  .dec('1.0', 'UTF-8');

  Object.keys(pkg).sort().forEach(function(i) {
    let types = xml.ele('types');
    //console.log(pkg[i]);
    pkg[i].forEach(x=> types.ele('members',x))
    types.ele('name',i);
  });
  xml.ele('version',pkg.version);
  return xml.end({ pretty: true, indent: '  ', newline: '\n' });;
};
module.exports = packageBuilder;