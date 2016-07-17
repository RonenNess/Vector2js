// add coverage to the Vector class
var covered = set_coverage(Vector);

// validate vector values
function assert_vector(a, v, x, y)
{
	a.deepEqual(v.to_list(), [x, y]);
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
	var vector = Vector.from_degree(45).mul_scalar_self(1000).round_self();
	assert_vector(assert, vector, 707, 707);

	// create from radian
	var vector = Vector.from_radian(45*(Math.PI/180)).mul_scalar_self(1000).round_self();
	assert_vector(assert, vector, 707, 707);
  
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
	assert.deepEqual(vector.to_list(), [1, 2]);
	assert.deepEqual(vector.to_dict(), {x:1, y:2});
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
	vector.copy_x(vector2);
	assert_vector(assert, vector, 19, 11);
	
	// test copy y
	vector2.y = 21;
	vector.copy_y(vector2);
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
	var vector_flipped = vector.flip_xy();
	assert_vector(assert, vector, 5, 6);
	assert_vector(assert, vector_flipped, 6, 5);
	
	// now flip self
	vector.flip_xy_self();
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
	vector.invert_self();
	assert_vector(assert, vector, -5, -6);
	
	// invert self again
	vector.invert_self();
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
	assert_vector(assert, vector.add_scalar(4), 5+4, 6+4);
	assert_vector(assert, vector, 5, 6);
	
	// test sub scalar
	assert_vector(assert, vector.sub_scalar(4), 5-4, 6-4);
	assert_vector(assert, vector, 5, 6);
	
	// test mul
	assert_vector(assert, vector.mul_scalar(4), 5*4, 6*4);
	assert_vector(assert, vector, 5, 6);
	
	// test div
	assert_vector(assert, vector.div_scalar(4), 5/4, 6/4);
	assert_vector(assert, vector, 5, 6);
});

// test all operators with 'self' versions
QUnit.test( "operators_self", function( assert ) {
  
	// create a testing vector
	var vector = new Vector(5, 6);
	vector_orig = vector.clone();

	// test add
	vector.add_self(new Vector(2, 3));
	assert_vector(assert, vector, 5+2, 6+3);
	vector = vector_orig.clone();
	
	// test sub
	vector.sub_self(new Vector(2, 3));
	assert_vector(assert, vector, 5-2, 6-3);
	vector = vector_orig.clone();
	
	// test mul
	vector.mul_self(new Vector(2, 3));
	assert_vector(assert, vector, 5*2, 6*3);
	vector = vector_orig.clone();
	
	// test div
	vector.div_self(new Vector(2, 3));
	assert_vector(assert, vector, 5/2, 6/3);
	vector = vector_orig.clone();
	
	// test add scalar
	vector.add_scalar_self(4)
	assert_vector(assert, vector, 5+4, 6+4);
	vector = vector_orig.clone();
	
	// test sub scalar
	vector.sub_scalar_self(4)
	assert_vector(assert, vector, 5-4, 6-4);
	vector = vector_orig.clone();
	
	// test mul
	vector.mul_scalar_self(4)
	assert_vector(assert, vector, 5*4, 6*4);
	vector = vector_orig.clone();
	
	// test div
	vector.div_scalar_self(4)
	assert_vector(assert, vector, 5/4, 6/4);
	vector = vector_orig.clone();
});


// test converting to degrees
QUnit.test( "to_degree", function( assert ) {

	var vector = new Vector(5, 0);
	var deg = vector.to_degree();
	assert.equal(deg, 0);

	var vector = new Vector(5, 5);
	var deg = vector.to_degree();
	assert.equal(deg, 45);

	var vector = new Vector(0, 5);
	var deg = vector.to_degree();
	assert.equal(deg, 90);

	var vector = new Vector(-5, 5);
	var deg = vector.to_degree();
	assert.equal(deg, 135);

	var vector = new Vector(-5, 0);
	var deg = vector.to_degree();
	assert.equal(deg, 180);

	var vector = new Vector(-5, -5);
	var deg = vector.to_degree();
	assert.equal(deg, 225);

	var vector = new Vector(0, -5);
	var deg = vector.to_degree();
	assert.equal(deg, 270);

	var vector = new Vector(5, -5);
	var deg = vector.to_degree();
	assert.equal(deg, 315);

});


// test converting to radian
QUnit.test( "to_radian", function( assert ) {

	var to_deg = (180 / Math.PI);

	var vector = new Vector(5, 0);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 0);

	var vector = new Vector(5, 5);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 45);

	var vector = new Vector(0, 5);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 90);

	var vector = new Vector(-5, 5);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 135);

	var vector = new Vector(-5, 0);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 180);

	var vector = new Vector(-5, -5);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 225);

	var vector = new Vector(0, -5);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 270);

	var vector = new Vector(5, -5);
	var rad = vector.to_radian();
	assert.equal(rad * to_deg, 315);

});


// test radian between two vectors
QUnit.test( "radian_to", function( assert ) {

	var to_deg = (180 / Math.PI);

	var v1 = new Vector(5, 5);
	var v2 = new Vector(10, 10);
	var rad = v1.radian_to(v2);
	assert.equal(rad * to_deg, 45);
	var rad = v2.radian_to(v1);
	assert.equal(rad * to_deg, 225);

});


// test radian between two vectors
QUnit.test( "degree_to", function( assert ) {

	var v1 = new Vector(5, 5);
	var v2 = new Vector(10, 10);
	var deg = v1.degree_to(v2);
	assert.equal(deg, 45);
	var deg = v2.degree_to(v1);
	assert.equal(deg, 225);

});


// test radian between two vectors
QUnit.test( "distance_and_length", function( assert ) {

	// calc distance
	var v1 = new Vector(-7, -4);
	var v2 = new Vector(17, 6);
	assert.equal(v1.distance_from(v2), 26);

	// calc length (magnitude is just an alias)
	var v1 = new Vector(12, 16);
	assert.equal(v1.length(), 20);
	assert.equal(v1.magnitude(), 20);
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
	vector.normalize_self();
	assert_vector(assert, vector, 1/Math.sqrt(2), -1/Math.sqrt(2));

});


// test round and abs functions
QUnit.test( "round_abs_apply", function( assert ) {

	// test round and round_self
	var vector = new Vector(1.45, 1.45);
	assert_vector(assert, vector.round(), 1, 1);
	assert_vector(assert, vector, 1.45, 1.45);
	vector.round_self();
	assert_vector(assert, vector, 1, 1);

	// test abs and abs_self
	var vector = new Vector(-1.45, -1.45);
	assert_vector(assert, vector.abs(), 1.45, 1.45);
	assert_vector(assert, vector, -1.45, -1.45);
	vector.abs_self();
	assert_vector(assert, vector, 1.45, 1.45);

	// test apply
	var vector = new Vector(1.23, 1.23);
	assert_vector(assert, vector.apply(Math.trunc), 1, 1);
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
	document.getElementById("covered-percent").innerHTML = Math.round((covered_count / total) * 100.0);
	document.getElementById("not-covered").innerHTML = String(not_covered).replace(new RegExp(",", 'g'), ", ");

}, 600);