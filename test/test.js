/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var EPS = require( '@stdlib/constants-float64-eps' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var abs = require( '@stdlib/math-base-special-abs' );
var cscd = require( './../lib' );


// FIXTURES //

var negative = require( './fixtures/julia/negative.json' );
var positive = require( './fixtures/julia/positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cscd, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = cscd( NaN );
	t.strictEqual( isnan( v ), true, 'returns expected value' );
	t.end();
});

tape( 'if provided a positive multiple of `180.0`, the function returns `+infinity`', function test( t ) {
	var v = cscd( 180.0 );
	t.strictEqual( PINF, v, 'returns expected value' );

	v = cscd( 360.0 );
	t.strictEqual( PINF, v, 'returns expected value' );

	t.end();
});

tape( 'if provided a negative multiple of `180.0`, the function returns `-infinity`', function test( t ) {
	var v = cscd( -180.0 );
	t.strictEqual( NINF, v, 'returns expected value' );

	v = cscd( -360.0 );
	t.strictEqual( NINF, v, 'returns expected value' );

	t.end();
});

tape( 'the function returns `-0` if provided `-infinity`', function test( t ) {
	var v = cscd( -0.0 );
	t.strictEqual( NINF, v, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+0` if provided `+infinity`', function test( t ) {
	var v = cscd( 0.0 );
	t.strictEqual( PINF, v, 'returns expected value' );
	t.end();
});

tape( 'the function computes the cosecant in degrees (negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = negative.x;
	expected = negative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cscd( x[i] );
		if ( expected[ i ] === null ) {
			t.strictEqual( y, NINF, 'x: '+x[i]+'. E: '+expected[i] );
			continue;
		}
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.4 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cosecant in degrees (positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = positive.x;
	expected = positive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cscd( x[i] );
		if ( expected[ i ] === null ) {
			t.strictEqual( y, PINF, 'x: '+x[i]+'. E: '+expected[i] );
			continue;
		}
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.4 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});
