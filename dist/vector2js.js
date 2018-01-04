/*
* A simple 2d Vector class for node.js / javascript.
*
* Author: Ronen Ness, 2016.
* License: MIT.
*/


(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('Vector', function() {

    "use strict";

    // create the vector main object
    var Vector = (function () {

        "use strict";

        // pi * 2
        var PI2 = Math.PI * 2;

        // convert radians to degrees
        var radToDeg = (180 / Math.PI);

        // convert degrees to radians
        var degToRad = (Math.PI / 180);

        // round numbers from 10'th digit
        // this is useful for calculations that should return round or almost round numbers, but have a long tail of 0's and 1 due to floating points stuff
        function smartRound(num)
        {
            return Math.round(num * 100000000.0) / 100000000.0;
        }

        // return distance between vectors
        function vectorsDistance(p1, p2) {
            var dx = p2.x - p1.x,
                dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        };

        // return angle (in radians) between two vectors
        function vectorsAngle(P1, P2, wrap) {
            var deltaY = P2.y - P1.y,
                deltaX = P2.x - P1.x;
            var ret = Math.atan2(deltaY, deltaX);
            if (wrap) {while (ret < 0) ret += PI2;}
            return ret;
        };

        // create the vector
        function Vector(x, y)
        {
            this.x = x !== undefined ? x : 0;
            this.y = y !== undefined ? y : 0;
        }

        // create a vector with length 1 from a given radian.
        // @param radian - angle in radians.
        // @return new vector instance.
        Vector.fromRadians = function (radian)
        {
            var x = Math.cos(radian);
            var y = Math.sin(radian);
            return new Vector(x, y);
        };

        // create a vector with length 1 from a given degree.
        // @param degree - angle in degrees.
        // @return new vector instance.
        Vector.fromDegrees = function (degree)
        {
            var rad = degree * (Math.PI / 180.0);
            return Vector.fromRadians(rad);
        };

        // create a vector from string ("x,y").
        // @param str - string to create vector from.
        // @return new vector instance.
        Vector.fromString = function (str)
        {
            var parts = str.split(",");
            return new Vector(parseFloat(parts[0]), parseFloat(parts[1]));
        };

        // create a vector from array ( [x, y] ).
        // @param arr - array to create vector from.
        // @return new vector instance.
        Vector.fromArray = function (arr)
        {
            return new Vector(arr[0], arr[1]);
        };

        // vector prototype
        Vector.prototype = {

            // version
            version: "2.0.1",

            // [API]
            // [chainable, clone]
            // clone the vector and return the cloned instance.
            // @return cloned vector.
            clone: function()
            {
                return new Vector(this.x, this.y);
            },

            // [API]
            // []
            // Get if equal to another vector
            // @param vector - other vector to compare with.
            // @return if vectors are equal.
            equals: function(vector)
            {
                return (this.prototype === vector.prototype) && (this.x === vector.x) && (this.y === vector.y);
            },

            // [API]
            // [chainable, changeSelf]
            // set values from another vector. this changes value of self.
            // @param vector - other vector to get values from.
            // @return self.
            copy: function(vector)
            {
                this.x = vector.x;
                this.y = vector.y;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // set only the x component from another vector.
            // @return self.
            copyX: function(vector)
            {
                this.x = vector.x;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // set only the y component from another vector.
            // @return self.
            copyY: function(vector)
            {
                this.y = vector.y;
                return this;
            },

            // [API]
            // []
            // convert to a dictionary with {x, y}.
            // @return a dictionary representation of the vector.
            toDict: function()
            {
                return {x: this.x, y: this.y};
            },

            // [API]
            // []
            // convert to array with [x, y].
            // @return an array representation of the vector.
            toArray: function()
            {
                return [this.x, this.y];
            },

            // [API]
            // [chainable, changeSelf]
            // set values from x, y.
            // @param x - optional x component to set.
            // @param y - optional y component to set.
            // @return self.
            set: function(x, y)
            {
                if (x !== undefined) this.x = x;
                if (y !== undefined) this.y = y;
                return this;
            },

            // [API]
            // [chainable, clone]
            // clone and flip between x and y values.
            // @return cloned vector with flipped x and y components.
            flipXY: function()
            {
                return new Vector(this.y, this.x);
            },

            // [API]
            // [chainable, changeSelf]
            // flip between x and y values.
            // @return self.
            flipXYSelf: function()
            {
                this.y = [this.x, this.x = this.y][0];
                return this;
            },

            // [API]
            // [chainable, clone]
            // clone and invert x and y values (like multiply with -1, eg x, y => -x, -y)
            // @return cloned vector with inverted values.
            invert: function()
            {
                return this.mulScalar(-1);
            },

            // [API]
            // [chainable, changeSelf]
            // invert x and y values (like multiply with -1, eg x, y => -x, -y)
            // @return self.
            invertSelf: function()
            {
                this.mulScalarSelf(-1);
                return this;
            },

            // [API]
            // []
            // get the distance from another vector.
            // @param other - vector to get distance from.
            // @return distance between vectors.
            distanceFrom: function (other)
            {
                return vectorsDistance(this, other);
            },

            // [API]
            // []
            // get angle from another vector in radians.
            // @return angle in radians from this to other.
            radiansTo: function (other)
            {
                return vectorsAngle(this, other, true);
            },

            // [API]
            // []
            // get degrees from another vector in degrees.
            // @return angle in degrees from this to other.
            degreesTo: function (other)
            {
                return vectorsAngle(this, other, true) * radToDeg;
            },

            // [API]
            // []
            // convert this vector to a radian angle.
            // this is equivalent to doing Vector.zero.radiansTo(this).
            // @return angle in radians.
            toRadians: function (other)
            {
                return vectorsAngle(Vector.zero, this, true);
            },

            // [API]
            // []
            // convert this vector to degree.
            // this is equivalent to doing Vector.zero.degreeTo(this).
            // @return angle in degrees (0-360).
            toDegrees: function (other)
            {
                return this.toRadians() * radToDeg;
            },

            // [API]
            // [chainable, changeSelf]
            // rotate this vector by a given degree.
            // @param degrees - degrees to rotate this vector by (can be positive or negative).
            // @return self.
            rotateDegreesSelf: function(degrees)
            {
                return this.rotateRadiansSelf(degrees * degToRad);
            },

            // [API]
            // [chainable]
            // clone and rotate the vector by a given degree.
            // @param degrees - degree to rotate this vector by (can be positive or negative).
            // @return cloned rotated vector.
            rotateDegrees: function(degrees)
            {
                return this.clone().rotateDegreesSelf(degrees);
            },

            // [API]
            // [chainable, changeSelf]
            // rotate this vector by a given radian.
            // @param radians - radians to rotate this vector by (can be positive or negative).
            // @return self.
            rotateRadiansSelf: function(radians)
            {
                var ca = Math.cos(radians);
                var sa = Math.sin(radians);
                var x = (this.x * ca) - (this.y * sa);
                var y = (this.x * sa) + (this.y * ca);
                this.x = smartRound(x);
                this.y = smartRound(y);
                return this;
            },

            // [API]
            // [chainable]
            // clone and rotate the vector by a given degree.
            // @param radians - radians to rotate this vector by (can be positive or negative).
            // @return cloned rotated vector.
            rotateRadians: function(radians)
            {
                return this.clone().rotateRadiansSelf(radians);
            },

            // [API]
            // []
            // calculate the length of this vector (aka magnitude).
            // @return vector length.
            length: function()
            {
                return Math.sqrt(this.x*this.x + this.y*this.y);
            },

            // [API]
            // [chainable, changeSelf]
            // normalize this vector, eg make length equal 1.
            // @return self.
            normalizeSelf: function()
            {
                var by = Math.sqrt(this.x * this.x + this.y * this.y);
                if (by === 0) return this;
                this.x /= by;
                this.y /= by;
                return this;
            },

            // [API]
            // [chainable, clone]
            // clone and normalize the vector.
            // @return normalized vector.
            normalize: function()
            {
                return this.clone().normalizeSelf();
            },

            // [API]
            // [chainable, changeSelf]
            // add other vector to self.
            // for example, v(10, 11) + v(5, 6) = v(15, 17).
            // @param other - vector to add components to self.
            // @return self.
            addSelf: function (other)
            {
                // if we got a number instead of vector, use the scalar function
                if (typeof other === "number") {
                    return this.addScalarSelf(other);
                }

                // update and return
                this.x += other.x;
                this.y += other.y;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // subtract other vector from self.
            // for example, v(10, 10) - v(2, 3) = v(8, 7).
            // @param other - vector to subtract components from self.
            // @return self.
            subSelf: function (other)
            {
                // if we got a number instead of vector, use the scalar function
                if (typeof other === "number") {
                    return this.subScalarSelf(other);
                }

                // update and return
                this.x -= other.x;
                this.y -= other.y;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // divide self by other vector.
            // for example, v(10, 20) / v(2, 5) = v(5, 4).
            // @param other - vector to divide components from self.
            // @return self.
            divSelf: function (other)
            {
                // if we got a number instead of vector, use the scalar function
                if (typeof other === "number") {
                    return this.divScalarSelf(other);
                }

                // update and return
                this.x /= other.x;
                this.y /= other.y;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // multiply self vector by other vector.
            // for example, v(2, 3) * v(3, 4) = v(6, 12).
            // @param other - vector to multiply components with self.
            // @return self.
            mulSelf: function (other)
            {
                // if we got a number instead of vector, use the scalar function
                if (typeof other === "number") {
                    return this.mulScalarSelf(other);
                }

                // update and return
                this.x *= other.x;
                this.y *= other.y;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // add scalar value to self.
            // for example, v(2, 3) + 5 = v(7, 8).
            // @param val - value to add to components.
            // @return self.
            addScalarSelf: function (val)
            {
                this.x += val;
                this.y += val;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // subtract scalar from self.
            // for example, v(7, 9) - 5 = v(3, 4).
            // @param val - value to subtract from components.
            // @return self.
            subScalarSelf: function (val)
            {
                this.x -= val;
                this.y -= val;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // divide self by scalar.
            // for example, v(6, 8) / 5 = v(3, 4).
            // @param val - value to divide components by.
            // @return self.
            divScalarSelf: function (val)
            {
                this.x /= val;
                this.y /= val;
                return this;
            },

            // [API]
            // [chainable, changeSelf]
            // multiply self by scalar.
            // for example, v(2, 3) * 2 = v(4, 6).
            // @param val - value to multiply components with.
            // @return self.
            mulScalarSelf: function (val)
            {
                this.x *= val;
                this.y *= val;
                return this;
            },

            // [API]
            // [chainable, clone]
            // clone self and add other vector to it.
            // @param other - vector to add with.
            // @return cloned vector.
            add: function (other)
            {
                return this.clone().addSelf(other);
            },

            // [API]
            // [chainable, clone]
            // clone self and subtract other vector from it.
            // @param other - vector to subtract with.
            // @return cloned vector.
            sub: function (other)
            {
                return this.clone().subSelf(other);
            },

            // [API]
            // [chainable, clone]
            // clone self and multiply by other vector.
            // @param other - vector to multiply with.
            // @return cloned vector.
            mul: function (other)
            {
                return this.clone().mulSelf(other);
            },

            // [API]
            // [chainable, clone]
            // clone self and divide by other vector.
            // @param other - vector to divide with.
            // @param scalar - value to divide by.
            // @return cloned vector.
            div: function (other)
            {
                return this.clone().divSelf(other);
            },

            // [API]
            // [chainable, clone]
            // clone self and add scalar to it.
            // @param scalar - value to add.
            // @return cloned vector.
            addScalar: function (scalar)
            {
                return this.clone().addScalarSelf(scalar);
            },

            // [API]
            // [chainable, clone]
            // clone self and substract scalar from it.
            // @param scalar - value to subtract.
            // @return cloned vector.
            subScalar: function (scalar)
            {
                return this.clone().subScalarSelf(scalar);
            },

            // [API]
            // [chainable, clone]
            // clone self and multiply by scalar.
            // @param scalar - value to multiply with.
            // @return cloned vector.
            mulScalar: function (scalar)
            {
                return this.clone().mulScalarSelf(scalar);
            },

            // [API]
            // [chainable, clone]
            // clone self and divide by scalar.
            // @param scalar - value to divide by.
            // @return cloned vector.
            divScalar: function (scalar)
            {
                return this.clone().divScalarSelf(scalar);
            },

            // [API]
            // [chainable, changeSelf]
            // clamp vector values into range.
            // note: this function does not validate that min < max.
            // @param min - min value for x, y components.
            // @param max - max value for x, y components.
            // @return self.
            clampSelf: function (min, max)
            {
                if (this.x < min.x) this.x = min.x;
                if (this.y < min.y) this.y = min.y;
                if (this.x > max.x) this.x = max.x;
                if (this.y > max.y) this.y = max.y;
                return this;
            },

            // [API]
            // [chainable, clone]
            // clone vector and clamp its values.
            // note: this function does not validate that min < max.
            // @param min - min value for x, y components.
            // @param max - max value for x, y components.
            // @return cloned vector in range.
            clamp: function (min, max)
            {
                return this.clone().clampSelf(min, max);
            },

            // [API]
            // [chainable, changeSelf]
            // apply a function on x and y components of the vector.
            // for example, you can use Math.round to round the vector x, y values.
            // @param func - function to apply on components.
            // @return self.
            applySelf: function (func)
            {
                this.x = func(this.x);
                this.y = func(this.y);
                return this;
            },

            // [API]
            // [chainable, clone]
            // clone self and apply a function on x and y components of the clone vector.
            // for example, you can use Math.round to round the vector x, y values.
            // @param func - function to apply on components.
            // @return cloned vector.
            apply: function (func)
            {
                return this.clone().applySelf(func);
            },

            // [API]
            // [chainable, changeSelf]
            // turn self to absolute values (eg turn x, y positive).
            // @return self.
            absSelf: function()
            {
                return this.applySelf(Math.abs);
            },

            // [API]
            // [chainable, clone]
            // clone and turn to absolute values (eg turn x, y positive).
            // @return cloned vector.
            abs: function()
            {
                return this.clone().absSelf();
            },

            // [API]
            // [chainable, changeSelf]
            // turn self to round values (eg turn x, y positive).
            // @return self.
            roundSelf: function()
            {
                return this.applySelf(Math.round);
            },

            // [API]
            // [chainable, clone]
            // clone and turn to round values (eg turn x, y positive).
            // @return cloned vector.
            round: function()
            {
                return this.clone().roundSelf();
            },

            // [API]
            // []
            // calculate dot-product of this vector with another vector.
            // @param other - other vector to calculate dot-product with.
            // @return dot product.
            dot: function (other)
            {
                return (this.x * other.x) + (this.y * other.y);
            },

            // [API]
            // []
            // calculate cross-product of this vector with another vector.
            // @param other - other vector to calculate cross-product with.
            // @return dot product.
            cross: function (other)
            {
                return (this.x * other.y) - (this.y * other.x);
            },

            // [API]
            // [chainable, changeSelf]
            // if any of the components of this vector are NaN, null, undefined, etc. set them to defaults.
            // note: 0's are considered to be a valid number and will not be replaced with a default value.
            // @param x - default value for x if undefined (0 if not defined).
            // @param y - default value for y if undefined (0 if not defined).
            // @return self.
            repairSelf: function(x, y)
            {
                // checking if number but also trying a simple math equasion and check if NaN (because typeof NaN == number..)
                if (typeof this.x !== "number" || isNaN(this.x + 1)) {this.x = x || 0;}
                if (typeof this.y !== "number" || isNaN(this.y + 1)) {this.y = y || 0;}
                return this;
            },

            // [API]
            // [chainable, clone]
            // create a clone and if any of the components of the vector are NaN, null, undefined, etc. set them to default.
            // note: 0's are considered to be a valid number and will not be replaced with a default value.
            // @param x - default value for x if undefined (0 if not defined).
            // @param y - default value for y if undefined (0 if not defined).
            // @return repaired clone.
            repair: function(x, y)
            {
                return this.clone().repairSelf(x, y);
            },

            // [API]
            // []
            // convert to string in the form of "x,y".
            // @return string representation of the vector.
            toString: function ()
            {
                // default format
                return this.x + "," + this.y;
            },

            // [API]
            // []
            // convert to a string with a given format.
            // @param format - a string in which %x and %y will be replaced with the vector values.
            // @return formatted string representing the vector.
            format: function (format)
            {
                // default format
                format = format || "%x,%y";
                format = format.replace(new RegExp("%x", 'g'), this.x);
                format = format.replace(new RegExp("%y", 'g'), this.y);
                return format;
            },
        };

        // return the vector class
        return Vector;

    })();

    // some default consts
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

    // alias for magnitude
    Vector.prototype.magnitude = Vector.prototype.length;

    // if freeze is supported make those consts freeze
    if (Object.freeze)
    {
        Object.freeze(Vector.zero);
        Object.freeze(Vector.one);
        Object.freeze(Vector.up);
        Object.freeze(Vector.down);
        Object.freeze(Vector.left);
        Object.freeze(Vector.right);
        Object.freeze(Vector.upLeft);
        Object.freeze(Vector.downLeft);
        Object.freeze(Vector.upRight);
        Object.freeze(Vector.downRight);
    }

    // return the vector class
    return Vector;
}));