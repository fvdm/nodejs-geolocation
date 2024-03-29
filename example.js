/* eslint-disable no-console */

const geo = require( 'google-geolocation' );

function out ( obj ) {
  console.dir( obj, {
    depth: null,
    colors: true,
  } );
}

// Get data
geo( {
  key: 'abc123',
  wifiAccessPoints: [
    {
      macAddress: '01:23:45:67:89:AB',
      signalStrength: -65,
      signalToNoiseRatio: 40,
    },
  ],
} )
  .then( out )
  .catch( err => {
    out( err );
    process.exit( 1 );
  } )
;
