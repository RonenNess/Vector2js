![Vector2js](./misc/logo.png)
=============================

# Vector2js
[A simple 2D Vectors for JS](https://ronenness.github.io/Vector2js/).

## Read the docs

Full docs can be found [here](https://ronenness.github.io/Vector2js/).

## Install

You can install via npm:

```
npm install vector2js
```

Or bower:

```
bower install vector2js
```

Or simply download the js files from /dist/ in this repo.

## Usage

If you are using [nodejs](https://nodejs.org/en/) or [browserify](http://browserify.org/), you can use Vector2js like this:

```javascript
// include vector2js
var Vector = require('vector2js');

// create a new vector
var vec = new Vector(10, 10);
```

If you include the JavaScript from /dist/ directly into your web pages, you will have 'Vector' in global scope and you can create new vectors like this:

```javascript
// create a new vector
var vec = new Vector(10, 10);
```

### Basic usage example:

Here's a basic usage example - adding two vectors and print the result length:

```javascript
var v1 = new Vector(5, 10);
var v2 = new Vector(1, 1);
console.log(v1.add(v2).length())
> 12.529964086141668
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

Then you can run the following command from the project root:

```
qunit-cli tests/test.js
```

## API

The following are all the API functions the vector class has:

```js
.clone ()
	[chainable][clone]
	Clone the vector and return the cloned instance.
	Return: Cloned Vector.

.equals (vector)
	Get if equal to another vector
	Param vector - other vector to compare with.
	Return: If Vectors Are Equal.

.copy (vector)
	[chainable][changeSelf]
	Set values from another vector. this changes value of self.
	Param vector - other vector to get values from.
	Return: Self.

.copyX (vector)
	[chainable][changeSelf]
	Set only the x component from another vector.
	Return: Self.

.copyY (vector)
	[chainable][changeSelf]
	Set only the y component from another vector.
	Return: Self.

.toDict ()
	Convert to a dictionary with {x, y}.
	Return: A Dictionary Representation Of The Vector.

.toArray ()
	Convert to array with x, y.
	Return: An Array Representation Of The Vector.

.set (x, y)
	[chainable][changeSelf]
	Set values from x, y.
	Param x - optional x component to set.
	Param y - optional y component to set.
	Return: Self.

.flipXY ()
	[chainable][clone]
	Clone and flip between x and y values.
	Return: Cloned Vector With Flipped X And Y Components.

.flipXYSelf ()
	[chainable][changeSelf]
	Flip between x and y values.
	Return: Self.

.invert ()
	[chainable][clone]
	Clone and invert x and y values (like multiply with -1, eg x, y => -x, -y)
	Return: Cloned Vector With Inverted Values.

.invertSelf ()
	[chainable][changeSelf]
	Invert x and y values (like multiply with -1, eg x, y => -x, -y)
	Return: Self.

.distanceFrom (other)
	Get the distance from another vector.
	Param other - vector to get distance from.
	Return: Distance Between Vectors.

.radiansTo (other)
	Get angle from another vector in radians.
	Return: Angle In Radians From This To Other.

.degreesTo (other)
	Get degrees from another vector in degrees.
	Return: Angle In Degrees From This To Other.

.toRadians (other)
	Convert this vector to a radian angle.
	This is equivalent to doing vector.zero.radiansto(this).
	Return: Angle In Radians.

.toDegrees (other)
	Convert this vector to degree.
	This is equivalent to doing vector.zero.degreeto(this).
	Return: Angle In Degrees (0-360).

.rotateDegreesSelf (degrees)
	[chainable][changeSelf]
	Rotate this vector by a given degree.
	Param degrees - degrees to rotate this vector by (can be positive or negative).
	Return: Self.

.rotateDegrees (degrees)
	[chainable]
	Clone and rotate the vector by a given degree.
	Param degrees - degree to rotate this vector by (can be positive or negative).
	Return: Cloned Rotated Vector.

.rotateRadiansSelf (radians)
	[chainable][changeSelf]
	Rotate this vector by a given radian.
	Param radians - radians to rotate this vector by (can be positive or negative).
	Return: Self.

.rotateRadians (radians)
	[chainable]
	Clone and rotate the vector by a given degree.
	Param radians - radians to rotate this vector by (can be positive or negative).
	Return: Cloned Rotated Vector.

.length ()
	Calculate the length of this vector (aka magnitude).
	Return: Vector Length.

.normalizeSelf ()
	[chainable][changeSelf]
	Normalize this vector, eg make length equal 1.
	Return: Self.

.normalize ()
	[chainable][clone]
	Clone and normalize the vector.
	Return: Normalized Vector.

.addSelf (other)
	[chainable][changeSelf]
	Add other vector to self.
	For example, v(10, 11) + v(5, 6) = v(15, 17).
	Param other - vector to add components to self.
	Return: Self.

.subSelf (other)
	[chainable][changeSelf]
	Subtract other vector from self.
	For example, v(10, 10) - v(2, 3) = v(8, 7).
	Param other - vector to subtract components from self.
	Return: Self.

.divSelf (other)
	[chainable][changeSelf]
	Divide self by other vector.
	For example, v(10, 20) / v(2, 5) = v(5, 4).
	Param other - vector to divide components from self.
	Return: Self.

.mulSelf (other)
	[chainable][changeSelf]
	Multiply self vector by other vector.
	For example, v(2, 3) * v(3, 4) = v(6, 12).
	Param other - vector to multiply components with self.
	Return: Self.

.addScalarSelf (val)
	[chainable][changeSelf]
	Add scalar value to self.
	For example, v(2, 3) + 5 = v(7, 8).
	Param val - value to add to components.
	Return: Self.

.subScalarSelf (val)
	[chainable][changeSelf]
	Subtract scalar from self.
	For example, v(7, 9) - 5 = v(3, 4).
	Param val - value to subtract from components.
	Return: Self.

.divScalarSelf (val)
	[chainable][changeSelf]
	Divide self by scalar.
	For example, v(6, 8) / 5 = v(3, 4).
	Param val - value to divide components by.
	Return: Self.

.mulScalarSelf (val)
	[chainable][changeSelf]
	Multiply self by scalar.
	For example, v(2, 3) * 2 = v(4, 6).
	Param val - value to multiply components with.
	Return: Self.

.add (other)
	[chainable][clone]
	Clone self and add other vector to it.
	Param other - vector to add with.
	Return: Cloned Vector.

.sub (other)
	[chainable][clone]
	Clone self and subtract other vector from it.
	Param other - vector to subtract with.
	Return: Cloned Vector.

.mul (other)
	[chainable][clone]
	Clone self and multiply by other vector.
	Param other - vector to multiply with.
	Return: Cloned Vector.

.div (other)
	[chainable][clone]
	Clone self and divide by other vector.
	Param other - vector to divide with.
	Param scalar - value to divide by.
	Return: Cloned Vector.

.addScalar (scalar)
	[chainable][clone]
	Clone self and add scalar to it.
	Param scalar - value to add.
	Return: Cloned Vector.

.subScalar (scalar)
	[chainable][clone]
	Clone self and substract scalar from it.
	Param scalar - value to subtract.
	Return: Cloned Vector.

.mulScalar (scalar)
	[chainable][clone]
	Clone self and multiply by scalar.
	Param scalar - value to multiply with.
	Return: Cloned Vector.

.divScalar (scalar)
	[chainable][clone]
	Clone self and divide by scalar.
	Param scalar - value to divide by.
	Return: Cloned Vector.

.clampSelf (min, max)
	[chainable][changeSelf]
	Clamp vector values into range.
	Note: this function does not validate that min < max.
	Param min - min value for x, y components.
	Param max - max value for x, y components.
	Return: Self.

.clamp (min, max)
	[chainable][clone]
	Clone vector and clamp its values.
	Note: this function does not validate that min < max.
	Param min - min value for x, y components.
	Param max - max value for x, y components.
	Return: Cloned Vector In Range.

.applySelf (func)
	[chainable][changeSelf]
	Apply a function on x and y components of the vector.
	For example, you can use math.round to round the vector x, y values.
	Param func - function to apply on components.
	Return: Self.

.apply (func)
	[chainable][clone]
	Clone self and apply a function on x and y components of the clone vector.
	For example, you can use math.round to round the vector x, y values.
	Param func - function to apply on components.
	Return: Cloned Vector.

.absSelf ()
	[chainable][changeSelf]
	Turn self to absolute values (eg turn x, y positive).
	Return: Self.

.abs ()
	[chainable][clone]
	Clone and turn to absolute values (eg turn x, y positive).
	Return: Cloned Vector.

.roundSelf ()
	[chainable][changeSelf]
	Turn self to round values (eg turn x, y positive).
	Return: Self.

.round ()
	[chainable][clone]
	Clone and turn to round values (eg turn x, y positive).
	Return: Cloned Vector.

.dot (other)
	Calculate dot-product of this vector with another vector.
	Param other - other vector to calculate dot-product with.
	Return: Dot Product.

.cross (other)
	Calculate cross-product of this vector with another vector.
	Param other - other vector to calculate cross-product with.
	Return: Dot Product.

.repairSelf (x, y)
	[chainable][changeSelf]
	If any of the components of this vector are nan, null, undefined, etc. set them to defaults.
	Note: 0's are considered to be a valid number and will not be replaced with a default value.
	Param x - default value for x if undefined (0 if not defined).
	Param y - default value for y if undefined (0 if not defined).
	Return: Self.

.repair (x, y)
	[chainable][clone]
	Create a clone and if any of the components of the vector are nan, null, undefined, etc. set them to default.
	Note: 0's are considered to be a valid number and will not be replaced with a default value.
	Param x - default value for x if undefined (0 if not defined).
	Param y - default value for y if undefined (0 if not defined).
	Return: Repaired Clone.

.toString ()
	Convert to string in the form of "x,y".
	Return: String Representation Of The Vector.

.format (format)
	Convert to a string with a given format.
	Param format - a string in which %x and %y will be replaced with the vector values.
	Return: Formatted String Representing The Vector.
```

### Consts

Vector2js comes with few useful constant vectors you can use:

```js
Vector.zero = new Vector(0, 0); 
Vector.one = new Vector(1, 1); 
Vector.up = new Vector(0, -1); 
Vector.down = new Vector(0, 1); 
Vector.left = new Vector(-1, 0); 
Vector.right = new Vector(1, 0); 
Vector.upLeft = new Vector(-1, -1); 
Vector.downLeft = new Vector(-1, 1); 
Vector.upRight = new Vector(1, -1); 
Vector.downRight = new Vector(1, 1); 
```

## License

Vector2js is distributed under the MIT license and is free for any personal or commercial purpose.

