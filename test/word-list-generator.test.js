const rewire = require("rewire")
var assert = require('chai').assert

const wordListGenerator_rewire = rewire('../word-list-generator')
const getWordByIndex_private = wordListGenerator_rewire.__get__('getWordByIndex')
const getWordSync_private = wordListGenerator_rewire.__get__('getWordSync')
const getCsvStream_private = wordListGenerator_rewire.__get__('getCsvStream')

const { getWordListSync, getWordListAsync } = require('../word-list-generator')
const { POST } = require('../word-list-generator/resource')



describe('getWordListAsync function with fizzbuzz mode ON', function() {
  let asyncList

  before(async () => {
    await getWordListAsync(true, (body) => {
      asyncList = body
    })
  })

  it('should return type object', function() {
    assert.typeOf(asyncList, 'object')
  })

  it('should return Fizz by number 3', function() {
    assert.equal(asyncList['3'], 'Fizz')
  })

  it('should return Buzz by number 5', function() {
    assert.equal(asyncList['5'], 'Buzz')
  })

  it('should return FizzBuzz by number 15', function() {
    assert.equal(asyncList['15'], 'FizzBuzz')
  })
})

describe('getWordListSync function with fizzbuzz mode ON', function() {
  let syncList

  before(() => {
    syncList = getWordListSync(true)
  })

  it('should return type object', function() {
    assert.typeOf(syncList, 'object')
  })

  it('should return Fizz by number 3', function() {
    assert.equal(syncList['3'], 'Fizz')
  })

  it('should return Buzz by number 5', function() {
    assert.equal(syncList['5'], 'Buzz')
  })

  it('should return FizzBuzz by number 15', function() {
    assert.equal(syncList['15'], 'FizzBuzz')
  })
})

describe('getCsvStream function', function() {
  it('should return stream', function() {
    let stream = getCsvStream_private()
    assert.equal(stream.writable, true)
  })
})

describe('getWordSync function', function() {
  it('should return random word with the String type', function() {
    let randomWord = getWordSync_private(false)
    assert.typeOf(randomWord, 'string')
  })
})

describe('POST function', function() {
  it('should send data with no error', function(done) {
    POST({a:'b'}, (err, data) => {
      if (err) done(err)
      else done(data)
    })
  })
})

describe('getWordByIndex function', function() {
  it('should return Fizz when the value is multiples of 3', function() {
    assert.equal(getWordByIndex_private(3), 'Fizz')
  })
  it('should return Buzz when the value is multiples of 5', function() {
    assert.equal(getWordByIndex_private(5), 'Buzz')
  })
  it('should return FizzBuzz when the value is multiples of 3 && 5', function() {
    assert.equal(getWordByIndex_private(15), 'FizzBuzz')
  })
  it('should return undefined when the value is not multiples of 3 || 5 || 3 && 5', function() {
    assert.equal(getWordByIndex_private(2), undefined)
  })
})