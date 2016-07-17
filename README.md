![Vector2js](./misc/logo.png)
=============================

# Vector2js
[A simple 2D Vectors for JS](https://ronenness.github.io/Vector2js/).

## Read the docs

Full docs can be found [here](https://ronenness.github.io/Vector2js/).

## Usage

If you are using [nodejs](https://nodejs.org/en/) or [browserify](http://browserify.org/), you can use Vector2js like this:

```javascript
// include vector2js
var Vector = require('vector2js');

// create a new vector
var vec = new Vector(10, 10);
```

If you include the JavaScript from /dist/ directly into your web pages, you will have 'Vector' in global scope and you can create new vectors with:

```javascript
// create a new vector
var vec = new Vector(10, 10);
```

## Tests & Browser support

Vector2js is fully testes on Node.js, IE6 & above, Edge, Chrome, FireFox and Opera, and have coverage of 100%. 

![BrowsersSupport](./misc/supported.png)

### Test in browsers

To test in browsers just open the file `/tests/test.html` with your browser of choice.

### Test in Node.js

To test in nodejs first install [qunit-cli](https://www.npmjs.com/package/qunit-cli):

```
npm install qunit-cli
```

Then from the `/tests/` folder you can execute tests with the following command:

```
qunit-cli test.js
```

## License

Vector2js is distributed under the MIT license and is free for any personal or commercial purpose.

