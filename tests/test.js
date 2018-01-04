// for qunit in nodejs
if (typeof require !== 'undefined')
{
     if (typeof QUnit == 'undefined') {QUnit = require('qunit-cli');}
	 if (typeof Vector == 'undefined') {Vector = require("./../dist/vector2js.js")}
}	

// return a dictionary with all method names and number of times they were called.
function set_coverage(obj)
{
    // return dictionary
    var ret = {};

    // function to wrap a method for coverage
    function wrap_method(obj, key)
    {
        // add to return dict
        ret[key] = 0;

        // copy the old function
        obj["__coverage_" + key] = obj[key];

        // create the wrapping function
        obj[key] = function()
        {
            // add counter
            ret[key]++;

            // call original function
            return obj["__coverage_" + key].apply(this, arguments);
        }
    }

    // set all object methods
    for (var key in obj)
    {
        if (typeof obj[key] === "function") {
            wrap_method(obj, key);
        }
    }

    // set all object prototype methods
    for (var key in obj.prototype)
    {
        if (typeof obj.prototype[key] === "function") {
            wrap_method(obj.prototype, key);
        }
    }

    // return the results dictionary
    return ret;
}
 
// add coverage to the Vector class
var covered = set_coverage(Vector);

// validate vector values
function assert_vector(a, v, x, y)
{
	a.deepEqual(v.toArray(), [x, y]);
}

// testing creating vectors with different params and ways
QUnit.test( "basic creation", function( assert ) {

	// create with default values
	var vector = new Vector();
	assert_vector(assert, vector, 0, 0);

	// create with 1 value
	var vector = new Vector(5);
	assert_vector(assert, vector, 5, 0);

	// create with 1 value
	var vector = new Vector(undefined, 5);
	assert_vector(assert, vector, 0, 5);

	// create with both values
	var vector = new Vector(15, 15);
	assert_vector(assert, vector, 15, 15);

	// create from degrees
	var vector = Vector.fromDegrees(45).mulScalarSelf(1000).roundSelf();
	assert_vector(assert, vector, 707, 707);

	// create from radian
	var vector = Vector.fromRadians(45*(Math.PI/180)).mulScalarSelf(1000).roundSelf();
	assert_vector(assert, vector, 707, 707);
	
	// create from string
	var vector = Vector.fromString("42.3,10");
	assert_vector(assert, vector, 42.3, 10);

	// create from array
	var vector = Vector.fromArray([42.3, 10]);
	assert_vector(assert, vector, 42.3, 10);
  
});

// test cloning
QUnit.test( "cloning", function( assert ) {
  
	// clone vector and validate values
	var vector = new Vector(25, 25);
	var vector2 = vector.clone();
	assert_vector(assert, vector, 25, 25);
	assert_vector(assert, vector2, 25, 25);

	// change values of one vector and test the other
	vector.set(1,1);
	assert_vector(assert, vector, 1, 1);
	assert_vector(assert, vector2, 25, 25);
	
	// now set the other
	vector2.set(5,5);
	assert_vector(assert, vector, 1, 1);
	assert_vector(assert, vector2, 5, 5);
	
});

// test to-dict, to-list, format and to-string
QUnit.test( "exports", function( assert ) {
  
	// check all basic exports
	var vector = new Vector(1, 2);
	assert.deepEqual(vector.toArray(), [1, 2]);
	assert.deepEqual(vector.toDict(), {x:1, y:2});
	assert.equal(vector.toString(), "1,2");
	assert.equal(vector.format("%x--%y"), "1--2");
	assert.equal(vector.format("%x--%y -> %x"), "1--2 -> 1");
});

// test copy functions
QUnit.test( "copy", function( assert ) {
  
	// create two vectors and test full copy
	var vector = new Vector(5, 6);
	var vector2 = new Vector(10, 11);
	assert_vector(assert, vector, 5, 6);
	vector.copy(vector2);
	assert_vector(assert, vector, 10, 11);
	
	// test copy x
	vector2.x = 19;
	vector.copyX(vector2);
	assert_vector(assert, vector, 19, 11);
	
	// test copy y
	vector2.y = 21;
	vector.copyY(vector2);
	assert_vector(assert, vector, 19, 21);
});

// test the set functions
QUnit.test( "set", function( assert ) {
  
	// create a vector and try to set it
	var vector = new Vector(5, 6);
	assert_vector(assert, vector, 5, 6);
	vector.set();
	assert_vector(assert, vector, 5, 6);
	vector.set(1);
	assert_vector(assert, vector, 1, 6);
	vector.set(undefined, 3);
	assert_vector(assert, vector, 1, 3);
	vector.set(7, 8);
	assert_vector(assert, vector, 7, 8);
});

// test the flip functions
QUnit.test( "flip", function( assert ) {
  
	// create a vector and try different flips
	var vector = new Vector(5, 6);
	var vector_flipped = vector.flipXY();
	assert_vector(assert, vector, 5, 6);
	assert_vector(assert, vector_flipped, 6, 5);
	
	// now flip self
	vector.flipXYSelf();
	assert_vector(assert, vector, 6, 5);
});

// test the invert functions
QUnit.test( "invert", function( assert ) {
  
	// create a vector and try different invert
	var vector = new Vector(5, 6);
	var vector_invert = vector.invert();
	assert_vector(assert, vector, 5, 6);
	assert_vector(assert, vector_invert, -5, -6);
	
	// now invert self
	vector.invertSelf();
	assert_vector(assert, vector, -5, -6);
	
	// invert self again
	vector.invertSelf();
	assert_vector(assert, vector, 5, 6);
});

// test all operators without 'self' versions
QUnit.test( "operators", function( assert ) {
  
	// create a testing vector
	var vector = new Vector(5, 6);

	// test add
	assert_vector(assert, vector.add(new Vector(2, 3)), 5+2, 6+3);
	assert_vector(assert, vector, 5, 6);
	
	// test sub
	assert_vector(assert, vector.sub(new Vector(2, 3)), 5-2, 6-3);
	assert_vector(assert, vector, 5, 6);
	
	// test mul
	assert_vector(assert, vector.mul(new Vector(2, 3)), 5*2, 6*3);
	assert_vector(assert, vector, 5, 6);
	
	// test div
	assert_vector(assert, vector.div(new Vector(2, 3)), 5/2, 6/3);
	assert_vector(assert, vector, 5, 6);
	
	// test add scalar
	assert_vector(assert, vector.addScalar(4), 5+4, 6+4);
	assert_vector(assert, vector, 5, 6);
	
	// test sub scalar
	assert_vector(assert, vector.subScalar(4), 5-4, 6-4);
	assert_vector(assert, vector, 5, 6);
	
	// test mul
	assert_vector(assert, vector.mulScalar(4), 5*4, 6*4);
	assert_vector(assert, vector, 5, 6);
	
	// test div
	assert_vector(assert, vector.divScalar(4), 5/4, 6/4);
	assert_vector(assert, vector, 5, 6);
});

// test all operators with 'self' versions
QUnit.test( "operatorsSelf", function( assert ) {
  
	// create a testing vector
	var vector = new Vector(5, 6);
	vector_orig = vector.clone();

	// test add
	vector.addSelf(new Vector(2, 3));
	assert_vector(assert, vector, 5+2, 6+3);
	vector = vector_orig.clone();
	
	// test sub
	vector.subSelf(new Vector(2, 3));
	assert_vector(assert, vector, 5-2, 6-3);
	vector = vector_orig.clone();
	
	// test mul
	vector.mulSelf(new Vector(2, 3));
	assert_vector(assert, vector, 5*2, 6*3);
	vector = vector_orig.clone();
	
	// test div
	vector.divSelf(new Vector(2, 3));
	assert_vector(assert, vector, 5/2, 6/3);
	vector = vector_orig.clone();
	
	// test add scalar
	vector.addScalarSelf(4)
	assert_vector(assert, vector, 5+4, 6+4);
	vector = vector_orig.clone();
	
	// test sub scalar
	vector.subScalarSelf(4)
	assert_vector(assert, vector, 5-4, 6-4);
	vector = vector_orig.clone();
	
	// test mul
	vector.mulScalarSelf(4)
	assert_vector(assert, vector, 5*4, 6*4);
	vector = vector_orig.clone();
	
	// test div
	vector.divScalarSelf(4)
	assert_vector(assert, vector, 5/4, 6/4);
	vector = vector_orig.clone();
});


// test converting to degrees
QUnit.test( "toDegree", function( assert ) {

	var vector = new Vector(5, 0);
	var deg = vector.toDegrees();
	assert.equal(deg, 0);

	var vector = new Vector(5, 5);
	var deg = vector.toDegrees();
	assert.equal(deg, 45);

	var vector = new Vector(0, 5);
	var deg = vector.toDegrees();
	assert.equal(deg, 90);

	var vector = new Vector(-5, 5);
	var deg = vector.toDegrees();
	assert.equal(deg, 135);

	var vector = new Vector(-5, 0);
	var deg = vector.toDegrees();
	assert.equal(deg, 180);

	var vector = new Vector(-5, -5);
	var deg = vector.toDegrees();
	assert.equal(deg, 225);

	var vector = new Vector(0, -5);
	var deg = vector.toDegrees();
	assert.equal(deg, 270);

	var vector = new Vector(5, -5);
	var deg = vector.toDegrees();
	assert.equal(deg, 315);

});


// test converting to radian
QUnit.test( "toRadian", function( assert ) {

	var to_deg = (180 / Math.PI);

	var vector = new Vector(5, 0);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 0);

	var vector = new Vector(5, 5);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 45);

	var vector = new Vector(0, 5);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 90);

	var vector = new Vector(-5, 5);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 135);

	var vector = new Vector(-5, 0);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 180);

	var vector = new Vector(-5, -5);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 225);

	var vector = new Vector(0, -5);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 270);

	var vector = new Vector(5, -5);
	var rad = vector.toRadians();
	assert.equal(rad * to_deg, 315);

});


// test radian between two vectors
QUnit.test( "radian_to", function( assert ) {

	var to_deg = (180 / Math.PI);

	var v1 = new Vector(5, 5);
	var v2 = new Vector(10, 10);
	var rad = v1.radiansTo(v2);
	assert.equal(rad * to_deg, 45);
	var rad = v2.radiansTo(v1);
	assert.equal(rad * to_deg, 225);

});


// test radian between two vectors
QUnit.test( "degree_to", function( assert ) {

	var v1 = new Vector(5, 5);
	var v2 = new Vector(10, 10);
	var deg = v1.degreesTo(v2);
	assert.equal(deg, 45);
	var deg = v2.degreesTo(v1);
	assert.equal(deg, 225);

});


// test radian between two vectors
QUnit.test( "distance_and_length", function( assert ) {

	// calc distance
	var v1 = new Vector(-7, -4);
	var v2 = new Vector(17, 6);
	assert.equal(v1.distanceFrom(v2), 26);

	// calc length (magnitude is just an alias)
	var v1 = new Vector(12, 16);
	assert.equal(v1.length(), 20);
	assert.equal(v1.magnitude(), 20);
});

// test equals
QUnit.test( "equals", function( assert ) {

    // not equal
	var v1 = new Vector(-7, -4);
	var v2 = new Vector(17, 6);
	assert.equal(v1.equals(v2), false);

	// equal
	var v1 = new Vector(17, 6);
	var v2 = new Vector(17, 6);
	assert.equal(v1.equals(v2), true);

	// wrong types
	assert.equal(v1.equals(5), false);
	assert.equal(v1.equals([17, 6]), false);
});

// test radian between two vectors
QUnit.test( "normalize", function( assert ) {

	// make sure that normalize of 0 vector returns 0
	var vector = new Vector(0, 0);
	assert_vector(assert, vector.normalize(), 0, 0);

	// use normalize and check value, also make sure original vector doesn't change
	var vector = new Vector(10, 10);
	assert_vector(assert, vector.normalize(), 1/Math.sqrt(2), 1/Math.sqrt(2));
	assert_vector(assert, vector, 10, 10);

	// test normalize-self
	var vector = new Vector(10, -10);
	vector.normalizeSelf();
	assert_vector(assert, vector, 1/Math.sqrt(2), -1/Math.sqrt(2));

});


// test round and abs functions
QUnit.test( "round_abs_apply", function( assert ) {

	// test round and roundSelf
	var vector = new Vector(1.45, 1.45);
	assert_vector(assert, vector.round(), 1, 1);
	assert_vector(assert, vector, 1.45, 1.45);
	vector.roundSelf();
	assert_vector(assert, vector, 1, 1);

	// test abs and absSelf
	var vector = new Vector(-1.45, -1.45);
	assert_vector(assert, vector.abs(), 1.45, 1.45);
	assert_vector(assert, vector, -1.45, -1.45);
	vector.absSelf();
	assert_vector(assert, vector, 1.45, 1.45);

	// test apply
	var vector = new Vector(1.23, 1.23);
	assert_vector(assert, vector.apply(Math.floor), 1, 1);
});

// test clamp functions
QUnit.test( "clamp", function( assert ) {

	// test clamp
	var vector = new Vector(5, 10);
	//sanity
	assert_vector(assert, vector.clamp(new Vector(1,1), new Vector(15,15)), 5, 10);
	// min stuff
	assert_vector(assert, vector.clamp(new Vector(6,1), new Vector(15,15)), 6, 10);
	assert_vector(assert, vector.clamp(new Vector(1,12), new Vector(15,15)), 5, 12);
	assert_vector(assert, vector.clamp(new Vector(7,12), new Vector(15,15)), 7, 12);
	// max stuff
	assert_vector(assert, vector.clamp(new Vector(1,1), new Vector(9,9)), 5, 9);
	assert_vector(assert, vector.clamp(new Vector(1,1), new Vector(4,10)), 4, 10);
	assert_vector(assert, vector.clamp(new Vector(1,1), new Vector(3,3)), 3, 3);
	// negatives
	assert_vector(assert, vector.clamp(new Vector(-2,-2), new Vector(15,15)), 5, 10);
	assert_vector(assert, vector.clamp(new Vector(-8,-8), new Vector(-4,-4)), -4, -4);
});

// test repair
QUnit.test( "repair", function( assert ) {

	// test clamp
	var vector = new Vector(5, NaN);
	assert_vector(assert, vector.repair(), 5, 0);

	var vector = new Vector(null, 0);
	assert_vector(assert, vector.repair(5, 5), 5, 0);

	var vector = new Vector(false, undefined);	// <-- undefined resolved to 0 on vector init
	assert_vector(assert, vector.repair(4, 4), 4, 0);

	var vector = new Vector(true, NaN);
	assert_vector(assert, vector.repair(3, 3), 3, 3);
});

// test cross product and dot product
QUnit.test( "dot_and_cross", function( assert ) {

	// test dot product
	var vector1 = new Vector(-1, 7);
	var vector2 = new Vector(-5, 8);
	assert.equal(vector1.dot(vector2), 61);
	var vector1 = new Vector(3, 2);
	var vector2 = new Vector(8, -1);
	assert.equal(vector1.dot(vector2), 22);

	// test cross product
	var vector1 = new Vector(-1, 7);
	var vector2 = new Vector(-5, 8);
	assert.equal(vector1.cross(vector2), 27);
	var vector1 = new Vector(3, 2);
	var vector2 = new Vector(8, -1);
	assert.equal(vector1.cross(vector2), -19);
});

// vector rotation
QUnit.test( "rotation", function( assert ) {

	var to_rad = (Math.PI / 180);

	// test rotate by degrees
	var vector = new Vector(2, 0);
	vector.rotateDegreesSelf(90);
	assert_vector(assert, vector, 0, 2);
	assert_vector(assert, vector.rotateDegrees(90), -2, 0);
	assert_vector(assert, vector.rotateDegrees(45), -1.41421356, 1.41421356);

	// test rotate by radians
	var vector = new Vector(2, 0);
	vector.rotateRadiansSelf(90*to_rad);
	assert_vector(assert, vector, 0, 2);
	assert_vector(assert, vector.rotateRadians(90*to_rad), -2, 0);
	assert_vector(assert, vector.rotateRadians(45*to_rad), -1.41421356, 1.41421356);
});

// print coverage percent
setTimeout(function()
{
	var covered_count = 0;
	var total = 0;
	var not_covered = [];
	for (var key in covered)
	{
		total++;
		if (covered[key] > 0)
		{
			covered_count++;
		}
		else
		{
			not_covered.push(key);
		}
	}

	if (not_covered.length === 0) not_covered = "None";
	var covered_percent = Math.round((covered_count / total) * 100.0);
	var not_covered_str = String(not_covered).replace(new RegExp(",", 'g'), ", ");
	if (typeof document != 'undefined')
	{
		document.getElementById("covered-percent").innerHTML = covered_percent;
		document.getElementById("not-covered").innerHTML = not_covered_str;
	}
	else
	{
		console.log("Covered percent: " + covered_percent + "%");
		console.log("Not covered: " + not_covered_str);
	}

}, 600);