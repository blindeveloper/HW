const rewire = require("rewire")
const assert = require('chai').assert
const expect = require('chai').expect

const wordListGenerator_rewire = rewire('../word-list-generator')
const getWordByIndex_private = wordListGenerator_rewire.__get__('getWordByIndex')
const getWordSync_private = wordListGenerator_rewire.__get__('getWordSync')
const getCsvStream_private = wordListGenerator_rewire.__get__('getCsvStream')

const { getWordListSync, getWordListAsync } = require('../word-list-generator')
const { POST } = require('../word-list-generator/resource')



describe('getWordListAsync function with fizzbuzz mode ON and error mode off', function() {
  let asyncList

  before(async () => {
    await getWordListAsync(true, false, body => asyncList = body)
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

  it('should return FizzBuzz by number 45', function() {
    assert.equal(asyncList['45'], 'FizzBuzz')
  })

  it('should return any word not from list [FizzBuzz, Buzz, Fizz]', function() {
    expect(asyncList['7']).to.not.equal('FizzBuzz')
    expect(asyncList['7']).to.not.equal('Buzz')
    expect(asyncList['7']).to.not.equal('Fizz')
  })
})

describe('getWordListSync function with fizzbuzz mode ON and error mode off', function() {
  let syncList

  before(() => syncList = getWordListSync(true, false))

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

  it('should return any word not from list [FizzBuzz, Buzz, Fizz]', function() {
    expect(syncList['7']).to.not.equal('FizzBuzz')
    expect(syncList['7']).to.not.equal('Buzz')
    expect(syncList['7']).to.not.equal('Fizz')
  })
})

describe('getWordSync function', function() {
  it('should return random word with the String type', function() {
    let randomWord = getWordSync_private(false)
    assert.typeOf(randomWord, 'string')
  })
})

describe('POST function', function() {
  it('should return same body in response[failed ? please check your proxy connection before fix]', function(done) {
    let body = {a:'b'}
    POST(body, (err, data) => {
      assert.equal(data.json.a, body.a)
      done()
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
  it('should return empty sting when the value is not multiples of 3 || 5 || 3 && 5', function() {
    assert.equal(getWordByIndex_private(2), '')
  })
})