/*
Name:             google-geolocation - test.js
Description:      Google Maps Geolocation API for Node.js (unofficial)
Author:           Franklin van de Meent (https://frankl.in)
License:          Unlicense (public domain, see LICENSE file)
Source & docs:    https://github.com/fvdm/nodejs-geolocation
Feedback & bugs:  https://github.com/fvdm/nodejs-geolocation/issues
*/

'use strict';

const dotest = require ('dotest');
const pkg = require ('./');

const config = {
  key: String (process.env.KEY),
  timeout: parseInt (process.env.TIMEOUT, 10)
};

const geolocation = pkg && pkg (config);


dotest.add ('Package', (test) => {
  test ()
    .isFunction ('fail', 'exports', pkg)
    .isFunction ('fail', 'interface', geolocation)
    .done ();
});


dotest.add ('Run function', (test) => {
  const params = {
    wifiAccessPoints: [
      {
        macAddress: '01:23:45:67:89:AB',
        signalStrength: -65,
        signalToNoiseRatio: 40
      }
    ]
  };

  // Get data
  geolocation (params, (err, data) => {
    const location = data && data.location;

    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data.location', location)
      .isNumber ('fail', 'data.location.lat', location && location.lat)
      .isNumber ('fail', 'data.location.lng', location && location.lng)
      .isNumber ('fail', 'data.accuracy', data && data.accuracy)
      .done ();
  });
});


dotest.add ('Error: api error', (test) => {
  const params = {
    considerIp: false,
    carrier: 0
  };

  geolocation (params, (err, data) => {
    const errors = err && err.error;
    const error = errors && errors [0];

    test ()
      .isError ('fail', 'err', err)
      .isArray ('fail', 'err.error', errors)
      .isObject ('fail', 'err.error[0]', error)
      .isExactly ('fail', 'err.error[0].reason', error && error.reason, 'notFound')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: request failed', (test) => {
  const cnf = {
    key: config.key,
    timeout: 1
  };

  const tmp = pkg (cnf);

  tmp (1, (err, data) => {
    const error = err && err.error;

    test ()
      .isError ('fail', 'err', err)
      .isError ('fail', 'err.error', error)
      .isExactly ('fail', 'err.error.code', error && error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.run ();
