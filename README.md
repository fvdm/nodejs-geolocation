# google-geolocation

Google Maps Geolocation API for Node.js (unofficial)

You need a Google API key with access to the Google Maps Geolocation API.

[![npm](https://img.shields.io/npm/v/google-geolocation.svg?maxAge=3600)](https://github.com/fvdm/nodejs-geolocation/blob/master/CHANGELOG.md)
[![Build Status](https://github.com/fvdm/nodejs-geolocation/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-geolocation/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-geolocation/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-geolocation?branch=master)

* [API documentation](https://developers.google.com/maps/documentation/geolocation/intro)


## Example

```js
const geo = require ('google-geolocation');

function out (obj) {
  console.dir (obj, {
    depth: null,
    colors: true,
  });
}

// Get data
geo ({
  key: 'abc123',
  wifiAccessPoints: [{
    macAddress: '01:23:45:67:89:AB',
    signalStrength: -65,
    signalToNoiseRatio: 40,
  }],
})
  .then (out)
  .catch (err => {
    out (err);
    process.exit (1);
  })
;
```


## Installation

`npm i google-geolocation`


## Configuration

param     | type   | default | description
:---------|:-------|:--------|:-----------
key       | string |         | Google API key
[timeout] | number | `5000`  | Request timeout in ms


#### Example

```js
const geo = require ('google-geolocation');

geo ({
  key: 'abc123',
  timeout: 2000,
});
```


## Unlicense

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

For more information, please refer to <https://unlicense.org>


## Author

[Franklin](https://fvdm.com)
| [Buy me a coffee](https://fvdm.com/donating)
