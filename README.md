# sfdc-merge-package

Package.xml merger

## Getting Started

Works in Unix like system.
Windows is not tested.

### Installing

```
npm install -g sfdc-merge-package
```

or

```
yarn globally add sfdc-merge-package
```

## Usage

### Command Line

```
$ smp -h

  Usage: smp [options]

  Merge package.xml

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -p, --packages               path to the packages.xml
    -o, --output                 path where to output the merged package.xml
```

### Module

```
  var smp = require('sfdc-merge-package');

  smp({
    'packages':'./src/packages.xml' // path to the packages.xml
  }, console.log);
```


## Built With

* [commander](https://github.com/tj/commander.js/) - The complete solution for node.js command-line interfaces, inspired by Ruby's commander.
* [extendify](https://github.com/bigShai/extendify) - Deep extend with customizable behavior.
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) - XML to JavaScript object converter.

## Versioning

[SemVer](http://semver.org/) is used for versioning.

## Authors

* **Sebastien Colladon** - *Initial work* - [scolladon](https://github.com/scolladon)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
