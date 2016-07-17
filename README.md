# Vector2js
[A simple 2D Vectors for JS](https://ronenness.github.io/Vector2js/).

### Read the docs

Full docs can be found [here](https://ronenness.github.io/Vector2js/).

### Usage

If you are using [nodejs](https://nodejs.org/en/) or [browserify](http://browserify.org/), you can use Vector2js like this:

```
// include vector2js
var Vector = require('vector2js');

// create a new vector
var vec = new Vector(10, 10);
```

If you include the JavaScript from /dist/ directly into your web pages, you will have 'Vector' in global scope and you can create new vectors with:

```
// create a new vector
var vec = new Vector(10, 10);
```

### Test

Vector2js is fully testes and have coverage of 100%. To run the tests, you can simply clone the git and open '/tests/test.html' with your browser of choice.

### License

Vector2js is distributed under the MIT license and is free for any personal or commercial purpose.

