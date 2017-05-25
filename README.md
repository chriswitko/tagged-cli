[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Example of simple CLI implementation

### Installation
```
Install dependencies:
> npm install

Run with default input
> npm start

Run with custom tags
> npm start duck,amet,ipsum

Inline debug mode
> DEBUG=1 npm start

Tests
> npm test
```

### Stack
- NodeJS V7
- ES6
- Mocha

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Requirements
----

- allow the user to supply a CLI argument containing a comma-separated list of tags
  - if no argument is given, load `tags.txt` to get an array of tags.
- for each of these tags, find out how many times that tag appears within the objects in `data/*.json` (_note:_ objects can be nested).
- final output should be formatted like this (sorted by most popular tag first):

```
pizza     15
spoon     2
umbrella  0
cats      0
```

- cache the result so that subsequent runs can return the result immediately without needing to process the files.
- use only core modules
- use the asynchronous variants of the file IO functions (eg. use `fs.readFile` not `fs.readFileSync`).
- if any of the data files contain invalid JSON, log the error with `console.error` and continue, ignoring that file.
- you can use any version of node, however your solution must use plain callbacks rather than promises.