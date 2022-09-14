'use strict';
const fs = require('fs');
const packageBuilder = require('./lib/utils/package-builder');
const asyncReadFile = require('./lib/utils/async-read-file');
const asyncXmlParser = require('./lib/utils/async-xml-parser');

// Plugin to merge package.xml.
module.exports = (config,logger) => {

  // Check if we have a non-empty list of packages
  if(typeof config.packages === 'undefined' || config.packages === null || config.packages === []) {
    throw new Error('List of package.xml files can not be empty');
  }

  // The module return this promise
  // This is where the job is done
 return new Promise((resolve, reject) => {
    Promise.all(config.packages.map(x=>asyncReadFile(x).then(asyncXmlParser)))
    .then(pkgs => {
      // Store max version;
      const pkg = {};
      pkg.version = Math.max(...pkgs.map(p=>p.Package.version[0]));
      pkgs.forEach(p=>p.Package.types.reduce((r,e)=>pkg[e.name[0]] = [...new Set((pkg[e.name[0]] || []).concat(e.members))],pkg))

      fs.writeFileSync(config.output, packageBuilder(pkg));
    })
    .catch(err =>
      reject(new Error(err))
    );
  });
};