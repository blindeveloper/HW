'use strict'

const request = require('request');

function POST(body, cb){
  request
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