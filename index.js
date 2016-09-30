/*
Name:             google-geolocation - index.js
Description:      Google Maps Geolocation API for Node.js (unofficial)
Author:           Franklin van de Meent (https://frankl.in)
License:          Unlicense (public domain, see LICENSE file)
Source & docs:    https://github.com/fvdm/nodejs-geolocation
Feedback & bugs:  https://github.com/fvdm/nodejs-geolocation/issues
*/

const httpreq = require ('httpreq');

let config = {
  key: null,
  timeout: 5000
};


/**
 * Perform geolocation request
 *
 * @callback callback
 * @param param {object} - Request body parameters
 * @param callback {function} - `function (err, data) {}`
 * @return {void}
 */

function geolocation (params, callback) {
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
 * @param set {object} - Configuration settings
 * @param set.key {string} - Google API key
 * @param [set.timeout=5000] {number} - Request timeout in ms
 * @return geolocation {function}
 */

module.exports = (set) {
  config.key = set && set.key || null;
  config.timeout = set && set.timeout || config.timeout;
  return geolocation;
}
