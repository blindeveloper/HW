const { getRandomWordSync, getRandomWord } = require('word-maker');
const csv = require('fast-csv')
const fs = require('fs')

const getCsvStream = () => {
  const csvStream = csv.createWriteStream({headers: true})
  const writableStream = fs.createWriteStream(`./${new Date().getTime()}_log.csv`)
  csvStream.pipe(writableStream)
  return csvStream
}

getCsvStream().write({
  test: 'test'
})


// 1. Print numbers from 1 to 100 to the console, but for each number also print a random word using the function `getRandomWordSync`.
const app = {
  counter:1,
  until:100,
  errorAlerdWord: 'Doh!',
  getRandomWordSync: () => {
    try {
      return getRandomWordSync({ withErrors: true })
    } catch (err) {
      return app.errorAlerdWord
    }
  },
  getStringToprint: (counter, word) => `${counter}: ${word}`,
  getWordByIndex: counter => {
    let newWord
    if (counter % 3 === 0 && counter % 5 === 0) {
      newWord = 'FizzBuzz'
    } else if (counter % 5 === 0) {
      newWord = 'Buzz'
    } else if (counter % 3 === 0) {
      newWord = 'Fizz'
    }
    return newWord
  },
  step1: () => {
    while(app.counter <= app.until) {
      let rundomWord = app.getRandomWordSync()
      console.log(app.getStringToprint(app.counter, rundomWord));
      app.counter++
   }
  },
  step2: () => {
    while(app.counter <= app.until) {
      let word = app.getWordByIndex(app.counter) || app.getRandomWordSync()
      console.log(app.getStringToprint(app.counter, word));
      app.counter++
   }
  },
  step3_1: async function() {
    for (; app.counter <= app.until; app.counter++) {
        await getRandomWord().then(randomWord => {
          console.log(app.getStringToprint(app.counter, randomWord))
        }, reject => {
          console.log('reject: ', reject);
        })
    }
  },
  step3_2: async function() {
    for (; app.counter <= app.until; app.counter++) {
        await getRandomWord({ withErrors: true }).then(randomWord => {
          let word = app.getWordByIndex(app.counter) || randomWord
          console.log(app.getStringToprint(app.counter, word))
        }, () => {
          console.log(app.getStringToprint(app.counter, app.errorAlerdWord))
        })
    }
  }
}

app.step1()
// app.step2()
// app.step3_1()
// app.step3_2()
// YOUR CODE HERE

