const fetch = require('node-fetch')

const URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY

const fetchBook = async (query, lang) => {
  // prepare query parameters
  const parameters = []
  parameters.push(`q=${encodeURI(query)}`)
  parameters.push(lang ? `langRestrict=${lang}` : '')
  parameters.push(`key=${API_KEY}`)

  // execute to google search
  const response = await fetch(`${URL}?${parameters.join('&')}`)
  return await response.json()
}

module.exports = {
  fetchBook,
}
