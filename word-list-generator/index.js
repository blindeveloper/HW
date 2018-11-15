'use strict'

const { getRandomWordSync, getRandomWord } = require('word-maker')
const csv = require('fast-csv')
const fs = require('fs')

let counter = 1
const until = 100
const errorAlerdWord = 'Doh!'

function getCsvStream() {
  const csvStream = csv.createWriteStream({headers: true})
  const writableStream = fs.createWriteStream(`./${new Date().getTime()}_log.csv`)
  csvStream.pipe(writableStream)

  return csvStream
}

function getWordSync(withErrors = false) {
  try {
    return getRandomWordSync({ withErrors: withErrors })
  } catch (err) {
    return errorAlerdWord
  }
}

function getWordByIndex(counter) {
  let newWord
  if (counter % 15 === 0) {
    newWord = 'FizzBuzz'
  } else if (counter % 5 === 0) {
    newWord = 'Buzz'
  } else if (counter % 3 === 0) {
    newWord = 'Fizz'
  }

  return newWord
}

function getWordListSync(isFizzBuzzModeOn = false) {
  const stream = getCsvStream()
  let body = {}

  while(counter <= until) {
    let word = isFizzBuzzModeOn ? getWordByIndex(counter) || getWordSync() : getWordSync()
    stream.write({number: counter, word: word})
    body[counter] = word
    counter++
  }

  counter = 0
  stream.end()
  return body
}

async function getWordListAsync(isFizzBuzzModeOn = false, cb) {
  const stream = getCsvStream()
  let body = {}

  for (; counter <= until; counter++) {
    await getRandomWord({ withErrors: false }).then(randomWord => {
      let word = isFizzBuzzModeOn ? getWordByIndex(counter) || randomWord : randomWord
      stream.write({number: counter, word: word})
      body[counter] = word
    }, () => {
      stream.write({number: counter, word: errorAlerdWord})
      body[counter] = errorAlerdWord
    })
  }

  counter = 0
  stream.end()
  cb(body)
}

module.exports = { getWordListSync, getWordListAsync }