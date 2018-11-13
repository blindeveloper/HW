const { getRandomWordSync, getRandomWord } = require('word-maker');

// 1. Print numbers from 1 to 100 to the console, but for each number also print a random word using the function `getRandomWordSync`.
const app = {
  counter:0,
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
    while(app.counter < app.until) {
      app.counter++
      console.log(app.getStringToprint(app.counter, null));
   }
  },
  step2: () => {
    while(app.counter < app.until) {
      app.counter++
      let fizzBuzzWord = app.getWordByIndex(app.counter)
      console.log(app.getStringToprint(app.counter, fizzBuzzWord));
   }
  }
}
getRandomWord().then(resolve => {
  console.log('resolve: ', resolve);
}, reject => {
  console.log('reject: ', reject);
})
// app.step1()
// app.step2()
// YOUR CODE HERE

