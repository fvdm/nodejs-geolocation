/*
Name:             google-geolocation - test.js
Description:      Google Maps Geolocation API for Node.js (unofficial)
Author:           Franklin (https://fvdm.com)
License:          Unlicense (public domain, see LICENSE file)
Source & docs:    https://github.com/fvdm/nodejs-geolocation
*/

const dotest = require( 'dotest' );
const app = require( './' );

const config = {
  key: process.env.KEY,
  timeout: process.env.TIMEOUT || 5000,
};


dotest.add( 'exports', async test => {
  test()
    .isFunction( 'fail', 'exports', app )
    .done()
  ;
} );


dotest.add( 'Function', async test => {
  let error;
  let data;

  try {
    data = await app( {
      key: config.key,
      timeout: config.timeout,
      wifiAccessPoints: [
        {
          macAddress: '01:23:45:67:89:AB',
          signalStrength: -65,
          signalToNoiseRatio: 40,
        },
      ],
    } );
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isObject( 'fail', 'data', data )
    .isNotEmpty( 'fail', 'data', data )
    .isObject( 'fail', 'data.location', data?.location )
    .isNumber( 'fail', 'data.location.lat', data?.location?.lat )
    .isNumber( 'fail', 'data.location.lng', data?.location?.lng )
    .isNumber( 'fail', 'data.accuracy', data?.accuracy )
    .done()
  ;
} );


dotest.add( 'API error', async test => {
  let error;
  let data;

  try {
    data = await app( {
      key: 'invalid',
      considerIp: false,
      carrier: 0,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test()
    .isError( 'fail', 'error', error )
    .isNotEmpty( 'fail', 'error.message', error?.message )
    .isNumber( 'fail', 'error.code', error?.code )
    .isArray( 'fail', 'error.errors', error?.errors )
    .isString( 'fail', 'error.reason', error?.reason )
    .isArray( 'fail', 'error.details', error?.details )
    .isUndefined( 'fail', 'data', data )
    .done()
  ;
} );


dotest.run();
