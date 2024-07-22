"use strict";
const fs = require("fs").promises;
const xml2js = require("xml2js");
const toXml = require("./lib/utils/package-builder");

// Plugin to merge package.xml.
module.exports = (config) => {
  // Check if we have a non-empty list of packages
  if (!Array.isArray(config.packages) || config.packages.length === 0) {
    throw new Error("List of package.xml files can not be empty");
  }

  return merge(config);
};

const merge = async (config) => {
  const packages = await parsePackages(config.packages);
  const mergedPackage = mergePackages(packages);
  const version = getMaxVersion(packages);

  await fs.writeFile(config.output, toXml(mergedPackage, version));
};

const parsePackages = async (packagesLocation) => {
  const packages = [];
  for (const packageLocation of packagesLocation) {
    const packageContent = await fs.readFile(packageLocation);
    const parser = new xml2js.Parser();
    const parsedPackage = await parser.parseStringPromise(packageContent);
    if (parsedPackage?.Package?.types) {
      packages.push(parsedPackage);
    }
  }
  return packages;
};

const mergePackages = (packages) =>
  packages.reduce((pkg, p) => {
    p.Package.types
      .filter((type) => type.members)
      .forEach((type) => {
        const typeName = type.name[0];
        const existingMembers = pkg.get(typeName) ?? new Set();
        pkg.set(typeName, new Set([...existingMembers, ...type.members]));
      });
    return pkg;
  }, new Map());

const getMaxVersion = (packages) =>
  Math.max(
    ...packages
      .filter((p) => p.Package?.version?.[0])
      .map((p) => p.Package.version[0])
  );
