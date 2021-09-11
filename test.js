/*
Name:             google-geolocation - test.js
Description:      Google Maps Geolocation API for Node.js (unofficial)
Author:           Franklin (https://fvdm.com)
License:          Unlicense (public domain, see LICENSE file)
Source & docs:    https://github.com/fvdm/nodejs-geolocation
*/

const dotest = require ('dotest');
const app = require ('./');

const config = {
  key: process.env.KEY,
  timeout: process.env.TIMEOUT || 5000,
};


dotest.add ('exports', async test => {
  test ()
    .isFunction ('fail', 'exports', app)
    .done ()
  ;
});


dotest.add ('Function', async test => {
  let error;
  let data;

  try {
    data = await app ({
      key: config.key,
      timeout: config.timeout,
      wifiAccessPoints: [
        {
          macAddress: '01:23:45:67:89:AB',
          signalStrength: -65,
          signalToNoiseRatio: 40,
        },
      ],
    });
  }
  catch (err) {
    error = err;
  }

  const location = data && data.location;

  test (error)
    .isObject ('fail', 'data', data)
    .isNotEmpty ('fail', 'data', data)
    .isObject ('fail', 'data.location', location)
    .isNumber ('fail', 'data.location.lat', location && location.lat)
    .isNumber ('fail', 'data.location.lng', location && location.lng)
    .isNumber ('fail', 'data.accuracy', data && data.accuracy)
    .done ()
  ;
});


dotest.add ('API error', async test => {
  let error;
  let data;

  try {
    data = await app ({
      key: config.key,
      considerIp: false,
      carrier: 0,
    });
  }
  catch (err) {
    error = err;
  }

  test ()
    .isError ('fail', 'error', error)
    .isExactly ('fail', 'error.message', error && error.message, 'notFound')
    .isNumber ('fail', 'error.code', error && error.code)
    .isArray ('fail', 'error.errors', error && error.errors)
    .isUndefined ('fail', 'data', data)
    .done ()
  ;
});


dotest.run ();
