google-geolocation
==================

Google Maps Geolocation API for Node.js (unofficial)

You need a Google API key with access to the Google Maps Geolocation API.

[![npm](https://img.shields.io/npm/v/google-geolocation.svg?maxAge=3600)](https://github.com/fvdm/nodejs-geolocation/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-geolocation.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-geolocation)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-geolocation/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-geolocation?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/fvdm/nodejs-geolocation/badges/master/dependencies.svg)](https://www.bithound.io/github/fvdm/nodejs-geolocation/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/fvdm/nodejs-geolocation/badges/master/code.svg)](https://www.bithound.io/github/fvdm/nodejs-geolocation/master/files)
[![Greenkeeper badge](https://badges.greenkeeper.io/fvdm/nodejs-geolocation.svg)](https://greenkeeper.io/)

* [Node.js](https://nodejs.org)
* [API documentation](https://developers.google.com/maps/documentation/geolocation/intro)


Example
-------

```js
const geolocation = require ('google-geolocation') ({
  key: 'api key'
});

// Configure API parameters
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
  if (err) {
    console.log (err);
    return;
  }

  console.log (data);
});
```


Installation
------------

`npm i google-geolocation --save`


Configuration
-------------

param   | type   | required | default | description
:-------|:-------|:---------|:--------|:---------------------
key     | string | yes      |         | Google API key
timeout | number | no       | 5000    | Request timeout in ms


#### Example

```js
const geolocation = require ('google-geolocation') ({
  key: 'abc123',
  timeout: 2000
});
```


Errors
------

message          | description              | props
:----------------|:-------------------------|:--------------------------------
api error        | API returned an error    | `.error` (array), `.statusCode`
invalid response | API returns invalid data | `.error` (string), `.statusCode`
request failed   | Request failed           | `.error`


Unlicense
---------

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
```

For more information, please refer to <http://unlicense.org>


Author
------

[Franklin van de Meent](https://frankl.in)

[![Buy me a coffee](https://frankl.in/u/kofi/kofi-readme.png)](https://ko-fi.com/franklin)
