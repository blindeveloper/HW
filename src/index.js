const { getRandomWordSync, getRandomWord } = require('word-maker');

// 1. Print numbers from 1 to 100 to the console, but for each number also print a random word using the function `getRandomWordSync`.
const app = {
  counter:1,
  until:100,
  getStringToprint: (counter, word) => `${counter}: ${word ? word : getRandomWordSync({ withErrors: false })}`,
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
      console.log(app.getStringToprint(app.counter, null));
      app.counter++
   }
  },
  step2: () => {
    while(app.counter <= app.until) {
      let fizzBuzzWord = app.getWordByIndex(app.counter)
      console.log(app.getStringToprint(app.counter, fizzBuzzWord));
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
  }
}

// app.step1()
// app.step2()
app.step3_1()
// YOUR CODE HERE

