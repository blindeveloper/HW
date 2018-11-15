const { getWordListSync, getWordListAsync } = require('../word-list-generator')
const { POST } = require('../word-list-generator/resource')

POST(getWordListSync(true, false), (err, data) => {
  if (err) throw err
  console.log(data);
})

getWordListAsync(true, false, body => {
  POST(body, (err, data) => {
    if (err) throw err
    console.log(data);
  })
})