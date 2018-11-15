'use strict'

const { getRandomWordSync, getRandomWord } = require('word-maker')
const csv = require('fast-csv')
const fs = require('fs')
const errorAlerdWord = 'Doh!'

/**
 * getCsvStream function returns stream and create file to log in.
 * @returns {object}
 */
function getCsvStream() {
  const csvStream = csv.createWriteStream({headers: true})
  const writableStream = fs.createWriteStream(`./${new Date().getTime()}_log.csv`)
  csvStream.pipe(writableStream)

  return csvStream
}

/**
 * getWordSync function returns random word in sync way. In case of error it returns 'Duh! word'.
 * @param {boolean} withErrors - flag for switching betwin error modes ON or OFF.
 * @returns {string}
 */
function getWordSync(withErrors = false) {
  try {
    return getRandomWordSync({ withErrors: withErrors })
  } catch (err) {
    return errorAlerdWord
  }
}

/**
 * GetWordByIndex function returns word by special index.
 * @param {number} counter - indicator of index.
 * @returns {string}
 */
function getWordByIndex(counter) {
  let newWord = ''
  if (counter % 15 === 0) {
    newWord = 'FizzBuzz'
  } else if (counter % 5 === 0) {
    newWord = 'Buzz'
  } else if (counter % 3 === 0) {
    newWord = 'Fizz'
  }

  return newWord
}

/**
 * setChanges is doing main changes in log file and body request object.
 * @param {number} counter - indicator of index.
 * @param {string} word - generated word to print.
 * @param {object} stream - stream which used for writing log via it.
 * @param {object} body - object which is going to be a body for http request.
 * @returns {undefined}
 */
function setChanges(counter, word, stream, body) {
  stream.write({number: counter, word: word})
  body[counter] = word
}

/**
 * Prints numbers from 1 to 100 in file with generated words in sync way. Returning body object for http request
 * @param {boolean} isFizzBuzzModeOn - flag for switching betwin FizzBuzz modes.
 * @param {boolean} withErrors - flag for switching betwin error modes for getRandomWordSync function.
 * @returns {object}
 */
function getWordListSync(isFizzBuzzModeOn = false, withErrors = false) {
  const stream = getCsvStream()
  let body = {}, counter = 1

  while(counter <= 100) {
    let word = isFizzBuzzModeOn ? getWordByIndex(counter) || getWordSync(withErrors) : getWordSync(withErrors)
    setChanges(counter, word, stream, body)
    counter++
  }

  stream.end()
  return body
}

/**
 * Prints numbers from 1 to 100 in file with generated words in Async way. Returning body object for http request
 * @param {boolean} isFizzBuzzModeOn - flag for switching betwin FizzBuzz modes.
 * @param {boolean} withErrors - flag for switching betwin error modes for getRandomWord function.
 * @param {function} cb - callback for returning of result.
 * @returns {object}
 */
async function getWordListAsync(isFizzBuzzModeOn = false, withErrors = false, cb) {
  const stream = getCsvStream()
  let body = {}

  for (let counter = 1; counter <= 100; counter++) {
    await getRandomWord({ withErrors: withErrors }).then(randomWord => {
      let word = isFizzBuzzModeOn ? getWordByIndex(counter) || randomWord : randomWord
      setChanges(counter, word, stream, body)
    }, () => setChanges(counter, errorAlerdWord, stream, body))
  }

  stream.end()
  cb(body)
}

module.exports = { getWordListSync, getWordListAsync }