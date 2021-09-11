/*
Name:             google-geolocation - index.js
Description:      Google Maps Geolocation API for Node.js (unofficial)
Author:           Franklin (https://fvdm.com)
License:          Unlicense (public domain, see LICENSE file)
Source & docs:    https://github.com/fvdm/nodejs-geolocation
*/

const { doRequest } = require ('httpreq');


/**
 * Perform geolocation request
 *
 * @param   {object}  params                 Parameters
 * @param   {string}  params.key             API key
 * @param   {number}  [params.timeout=5000]  Request timeout in ms
 *
 * @return {Promise<object>}
 */

module.exports = async ({
  key,
  timeout = 5000,
}) => {
  delete arguments[0].key;
  delete arguments[0].timeout;

  const options = {
    method: 'POST',
    url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
    json: arguments[0],
    timeout,
  };

  const res = await doRequest (options);
  const data = JSON.parse (res.body);

  if (data.error) {
    const error = new Error (data.error.message);

    error.code = data.error.code;
    error.errors = data.error.errors;

    throw error;
  }

  return data;
};
