'use strict'

const request = require('request');

function POST(body, cb){
  request
  .defaults({'proxy': 'http://sg0301761:blinD*s*abre**29@www-ad-proxy.sabre.com:80/'})
  .post(
    'https://httpbin.org/post',
    { json: body },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        cb(null, body)
      } else {
        cb(error)
      }
    }
  )
}

module.exports = { POST }