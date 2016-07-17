/*
* A simple 2d Vector class for node.js / javascript.
* Exported and refactored from SSCD.js lib (https://github.com/RonenNess/SSCD.js).
*
* Author: Ronen Ness, 2016.
* License: MIT.
*/

var Vector = (function ()
{
    "use strict";

    // pi * 2
    var PI2 = Math.PI * 2;

    // convert radian to degree
    var rad_to_deg = (180 / Math.PI);

    // return distance between vectors
    function vectors_distance(p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // return angle (in radians) between two vectors
    function vectors_angle(P1, P2, wrap) {
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

    // create a vector with length 1 from radian.
    // @param radian - angle in radians
    Vector.from_radian = function (radian)
    {
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        return new Vector(x, y);
    };

    // create a vector with length 1 from degree.
    // @param degree - angle in degrees.
    Vector.from_degree = function (degree)
    {
        var rad = degree * (Math.PI / 180.0);
        return Vector.from_radian(rad);
    };

    // vector prototype
    Vector.prototype = {

        // version
        version: "1.0.0",

        // [chainable, clone]
        // clone the vector and return the clone
        // @return cloned vector.
        clone: function()
        {
            return new Vector(this.x, this.y);
        },

        // [chainable, change_self]
        // set values from another vector. this changes value of self.
        // @param vector - other vector to get values from.
        // @return self.
        copy: function(vector)
        {
            this.x = vector.x;
            this.y = vector.y;
            return this;
        },

        // [chainable, change_self]
        // set x component from another vector.
        // @return self.
        copy_x: function(vector)
        {
            this.x = vector.x;
            return this;
        },
        
        // [chainable, change_self]
        // set y component from another vector.
        // @return self.
        copy_y: function(vector)
        {
            this.y = vector.y;
            return this;
        },
        
        // []
        // convert to dict with {x, y}.
        // @return a dictionary.
        to_dict: function()
        {
            return {x: this.x, y: this.y};
        },
        
        // []
        // return a list with [x, y].
        // @return a list.
        to_list: function()
        {
            return [this.x, this.y];
        },

        // [chainable, change_self]
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

        // [chainable, clone]
        // clone and flip between x and y.
        // @return copy vector with flipped x and y components.
        flip_xy: function()
        {
            return new Vector(this.y, this.x);
        },

        // [chainable, change_self]
        // flip between x and y of self.
        // @return self.
        flip_xy_self: function()
        {
            this.y = [this.x, this.x = this.y][0];
            return this;
        },

        // [chainable, clone]
        // create an inverted copy of self (eg {x, y} => {-x, -y}).
        // @return cloned vector with inverted values.
        invert: function()
        {
            return this.mul_scalar(-1);
        },

        // [chainable, change_self]
        // make negative self (multiply by -1)
        invert_self: function()
        {
            this.mul_scalar_self(-1);
            return this;
        },
        
        // []
        // get distance from another vector.
        // @param other - vector to get distance from.
        // @return distance between vectors.
        distance_from: function (other)
        {
            return vectors_distance(this, other);
        },

        // []
        // get angle from another vector.
        // @return angle in radians from this to other.
        radian_to: function (other)
        {
            return vectors_angle(this, other, true);
        },
		
		// []
        // get degrees from another vector.
        // @return angle in degrees from this to other.
        degree_to: function (other)
        {
            return vectors_angle(this, other, true) * rad_to_deg;
        },

        // []
        // convert this vector to radian angle.
        // @return angle in radians.
        to_radian: function (other)
        {
            return vectors_angle(Vector.zero, this, true);
        },

        // []
        // calculate the length of this vector
        // @return vector length.
        length: function()
        {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        },

        // []
        // convert this vector to degree.
        // @return angle in degrees (0-360).
        to_degree: function (other)
        {
            return this.to_radian() * rad_to_deg;
        },
		
        // [chainable, change_self]
        // normalize this vector and return it.
        // @return self.
        normalize_self: function()
        {
            var by = Math.sqrt(this.x * this.x + this.y * this.y);
            if (by === 0) return this;
            this.x /= by;
            this.y /= by;
            return this;
        },

        // [chainable, clone]
        // return normalized copy of this vector.
        // @return normalized vector.
        normalize: function()
        {
            return this.clone().normalize_self();
        },

        // [chainable, change_self]
        // add other vector to self.
        // @return self.
        add_self: function (other)
        {
            this.x += other.x;
            this.y += other.y;
            return this;
        },

        // [chainable, change_self]
        // substract other vector from self.
        // @return self.
        sub_self: function (other)
        {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        },

        // [chainable, change_self]
        // divide self by other vector.
        // @return self.
        div_self: function (other)
        {
            this.x /= other.x;
            this.y /= other.y;
            return this;
        },

        // [chainable, change_self]
        // multiply self vector by other vector.
        // @return self.
        mul_self: function (other)
        {
            this.x *= other.x;
            this.y *= other.y;
            return this;
        },

        // [chainable, change_self]
        // add scalar to self.
        // @return self.
        add_scalar_self: function (val)
        {
            this.x += val;
            this.y += val;
            return this;
        },

        // [chainable, change_self]
        // sub scalar from self.
        // @return self.
        sub_scalar_self: function (val)
        {
            this.x -= val;
            this.y -= val;
            return this;
        },

        // [chainable, change_self]
        // divide self by scalar.
        // @return self.
        div_scalar_self: function (val)
        {
            this.x /= val;
            this.y /= val;
            return this;
        },

        // [chainable, change_self]
        // multiply self by scalar.
        // @return self.
        mul_scalar_self: function (val)
        {
            this.x *= val;
            this.y *= val;
            return this;
        },

        // [chainable, clone]
        // clone self and add other vector to it.
        // @return cloned vector.
        add: function (other)
        {
            return this.clone().add_self(other);
        },

        // [chainable, clone]
        // clone self and substract other vector from it.
        // @return cloned vector.
        sub: function (other)
        {
            return this.clone().sub_self(other);
        },

        // [chainable, clone]
        // clone self and multiply by other vector.
        // @return cloned vector.
        mul: function (other)
        {
            return this.clone().mul_self(other);
        },

        // [chainable, clone]
        // clone self and divide by other vector.
        // @return cloned vector.
        div: function (other)
        {
            return this.clone().div_self(other);
        },

        // [chainable, clone]
        // clone self and add scalar to it.
        // @param scalar - value to add.
        // @return cloned vector.
        add_scalar: function (scalar)
        {
            return this.clone().add_scalar_self(scalar);
        },

        // [chainable, clone]
        // clone self and substract scalar from it.
        // @param scalar - value to substract.
        // @return cloned vector.
        sub_scalar: function (scalar)
        {
            return this.clone().sub_scalar_self(scalar);
        },

        // [chainable, clone]
        // clone self and multiply by scalar.
        // @param scalar - value to multiply.
        // @return cloned vector.
        mul_scalar: function (scalar)
        {
            return this.clone().mul_scalar_self(scalar);
        },

        // [chainable, clone]
        // clone self and divide by scalar.
        // @param scalar - value to divide by.
        // @return cloned vector.
        div_scalar: function (scalar)
        {
            return this.clone().div_scalar_self(scalar);
        },

        // [chainable, change_self]
        // clamp vector values into range.
        // @param min - min value for x, y components.
        // @param max - max value for x, y components.
        // @return self.
        clamp_self: function (min, max)
        {
            if (this.x < min.x) this.x = min.x;
            if (this.y < min.y) this.y = min.y;
            if (this.x > max.x) this.x = max.x;
            if (this.y > max.y) this.y = max.y;
            return this;
        },
        
        // [chainable, clone]
        // clone vector and clamp its values
        // @param min - min value for x, y components.
        // @param max - max value for x, y components.
        // @return cloned vector in range.
        clamp: function (min, max)
        {
            return this.clone().clamp_self(min, max);
        },

        // [chainable, change_self]
        // apply a function on x and y components on self. 
        // for example, you can use Math.round to round values.
        // @param func - function to run on components.
        // @return self.
        apply_self: function (func)
        {
            this.x = func(this.x);
            this.y = func(this.y);
            return this;
        },

        // [chainable, clone]
        // clone self and apply a function on x and y components on the clone. 
        // for example, you can use Math.round to round values.
        // @param func - function to run on components.
        // @return cloned vector.
        apply: function (func)
        {
            return this.clone().apply_self(func);
        },

        // [chainable, change_self]
        // turn self to absolute values (eg turn x, y positive).
        // @return self.
        abs_self: function()
        {
            return this.apply_self(Math.abs);
        },

        // [chainable, clone]
        // clone and turn to absolute values (eg turn x, y positive).
        // @return cloned vector.
        abs: function()
        {
            return this.clone().abs_self();
        },

        // [chainable, change_self]
        // turn self to round values (eg turn x, y positive).
        // @return self.
        round_self: function()
        {
            return this.apply_self(Math.round);
        },

        // [chainable, clone]
        // clone and turn to round values (eg turn x, y positive).
        // @return cloned vector.
        round: function()
        {
            return this.clone().round_self();
        },		
	   
        // [chainable, change_self]
        // if any of the components of this vector are NaN, null, undefined, etc. set them to default.
        // note: 0's will not be replaced with default values.
        // @param x - default value for x if undefined (0 if not defined).
        // @param y - default value for y if undefined (0 if not defined).
        // @return self.
        repair_self: function(x, y)
        {
            // checking if number but also trying a simple math equasion and check if NaN (because typeof NaN == number..)
            if (typeof this.x !== "number" || isNaN(this.x + 1)) {this.x = x || 0;}
            if (typeof this.y !== "number" || isNaN(this.y + 1)) {this.y = y || 0;}
            return this;
        },

        // [chainable, clone]
        // create a clone and if any of the components of this vector are NaN, null, undefined, etc. set them to default.
        // note: 0's will not be replaced with default values.
        // @param x - default value for x if undefined (0 if not defined).
        // @param y - default value for y if undefined (0 if not defined).
        // @return repaired clone.
        repair: function(x, y)
        {
            return this.clone().repair_self(x, y);
        },

        // []
        // convert to string ("x,y").
        // @return string representation of the vector.
        toString: function ()
        {
            // default format
            return this.x + "," + this.y;
        },
        
        // []
        // convert to string with given format.
        // @param format - string in which %x will be replaced with x value and %y with y value.
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

    // some default consts
    Vector.zero = new Vector(0, 0);
    Vector.one = new Vector(1, 1);
    Vector.up = new Vector(0, -1);
    Vector.down = new Vector(0, 1);
    Vector.left = new Vector(-1, 0);
    Vector.right = new Vector(1, 0);
    Vector.up_left = new Vector(-1, -1);
    Vector.down_left = new Vector(-1, 1);
    Vector.up_right = new Vector(1, -1);
    Vector.down_right = new Vector(1, 1);

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
        Object.freeze(Vector.up_left);
        Object.freeze(Vector.down_left);
        Object.freeze(Vector.up_right);
        Object.freeze(Vector.down_right);
    }
    
    // return the vector class
    return Vector;
    
})();
