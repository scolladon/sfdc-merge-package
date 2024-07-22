"use strict";
const { create } = require("xmlbuilder2");

const xmlConf = { indent: "    ", newline: "\n", prettyPrint: true };
const frLocale = "fr";

const toXml = (pkg, version) => {
  const xml = create({ version: "1.0", encoding: "UTF-8" }).ele("Package", {
    xmlns: "http://soap.sforce.com/2006/04/metadata",
  });

  Array.from(pkg.keys())
    .sort(sortTypesWithMetadata)
    .forEach((metadataType) => {
      [...pkg.get(metadataType)]
        .sort(Intl.Collator(frLocale).compare)
        .reduce((type, member) => {
          type.ele("members").txt(member);
          return type;
        }, xml.ele("types"))
        .ele("name")
        .txt(metadataType);
    });
  xml.ele("version").txt(`${version}.0`);
  return xml.end(xmlConf);
};

const sortTypesWithMetadata = (x, y) => {
  if (x === "CustomObject") return -1; // @deprecated To remove when the order will not impact the result of the deployment
  return new Intl.Collator(frLocale).compare(x, y);
};
module.exports = toXml;
