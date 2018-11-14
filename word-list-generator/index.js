'use strict'

const { getRandomWordSync, getRandomWord } = require('word-maker');
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

function writeToStream(stream, index, word) {
  stream.write({
    number: index,
    word: word
  })
}

function getRandomWordSync2() {
  try {
    return getRandomWordSync({ withErrors: true })
  } catch (err) {
    return errorAlerdWord
  }
}

function getWordByIndex(counter) {
  let newWord
  if (counter % 3 === 0 && counter % 5 === 0) {
    newWord = 'FizzBuzz'
  } else if (counter % 5 === 0) {
    newWord = 'Buzz'
  } else if (counter % 3 === 0) {
    newWord = 'Fizz'
  }

  return newWord
}

function step1() {
  const stream = getCsvStream()
  while(counter <= until) {
    let word = getRandomWordSync2()
    writeToStream(stream, counter, word)
    counter++
  }
}

function step2() {
  const stream = getCsvStream()
  while(counter <= until) {
    let word = getWordByIndex(counter) || getRandomWordSync2()
    writeToStream(stream, counter, word)
    counter++
  }
}

async function step3_1() {
  const stream = getCsvStream()
  for (; counter <= until; counter++) {
      await getRandomWord({ withErrors: true }).then(randomWord => {
        writeToStream(stream, counter, randomWord)
      }, () => writeToStream(stream, counter, errorAlerdWord))
  }
}

async function step3_2() {
  const stream = getCsvStream()
  for (; counter <= until; counter++) {
      await getRandomWord({ withErrors: true }).then(randomWord => {
        let word = getWordByIndex(counter) || randomWord
        writeToStream(stream, counter, word)
      }, () => writeToStream(stream, counter, errorAlerdWord))
  }
}

module.exports = { step1, step2, step3_1, step3_2 }