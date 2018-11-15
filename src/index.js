const { getWordListSync, getWordListAsync } = require('../word-list-generator')
const { POST } = require('../word-list-generator/resource')

POST(getWordListSync(true), (err, data) => {
  if (err) throw err
  console.log(data);
})

getWordListAsync(true, body => {
  POST(body, (err, data) => {
    if (err) throw err
    console.log(data);
  })
})