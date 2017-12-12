/*
Name:             google-geolocation - index.js
Description:      Google Maps Geolocation API for Node.js (unofficial)
Author:           Franklin van de Meent (https://frankl.in)
License:          Unlicense (public domain, see LICENSE file)
Source & docs:    https://github.com/fvdm/nodejs-geolocation
Feedback & bugs:  https://github.com/fvdm/nodejs-geolocation/issues
*/

'use strict';

const httpreq = require ('httpreq');

let config = {
  key: null,
  timeout: 5000
};


/**
 * Perform geolocation request
 *
 * @callback  callback
 * @param     {object}    param    Request body parameters
 * @param     {function}  callback `(err, data)`
 *
 * @return    {void}
 */

function methodGeolocation (params, callback) {
  const options = {
    method: 'POST',
    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + config.key,
    json: params,
    timeout: config.timeout
  };

  httpreq.doRequest (options, (err, res) => {
    let data = res && res.body || '';
    let error = null;

    try {
      data = JSON.parse (data);
    } catch (e) {
      error = new Error ('invalid response');
      error.error = e;
    }

    if (err) {
      error = new Error ('request failed');
      error.error = err;
    }

    if (data && data.error) {
      error = new Error ('api error');
      error.error = data.error.errors;
    }

    if (error) {
      error.statusCode = res && res.statusCode;
      callback (error);
    } else {
      callback (null, data);
    }
  });
}


/**
 * Module setup
 *
 * @param   {object}    set                 Configuration settings
 * @param   {string}    set.key             Google API key
 * @param   {int}       [set.timeout=5000]  Request timeout in ms
 *
 * @return  {function}
 */

module.exports = (set) => {
  config.key = set && set.key || null;
  config.timeout = set && set.timeout || config.timeout;
  return methodGeolocation;
};
