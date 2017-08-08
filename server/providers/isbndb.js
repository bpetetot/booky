/**
 * ISBNdb Provider
 * http://isbndb.com/api/v2/docs
 */

const fetch = require('node-fetch')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')

const URL = (key, query) => `http://isbndb.com/api/v2/json/${key}/book/${query}`
const API_KEY = process.env.ISBNDB_API_KEY

const convertJson = (json) => {
  if (json && json.data && json.data.length > 0) {
    return json.data.map(item => ({
      title: item.title,
      subtitle: item.title_long,
      authors: item.author_data && item.author_data.map(a => a.name),
      publisher: item.publisher_name,
      identifiers: { isbn13: item.isbn13, isbn10: item.isbn10 },
      description: item.summary,
      categories: item.subject_ids,
      language: item.language,
    }))
  }
  return undefined
}

const fetchAPI = async (query) => {
  const response = await fetch(URL(API_KEY, query))
  const json = await response.json()
  return convertJson(json)
}

const getByISBN = async (isbn, lang) => {
  const results = await fetchAPI(isbn, lang)
  if (results && results.length > 0) {
    return pickBy(results[0], identity)
  }
  return undefined
}

module.exports = {
  getByISBN,
}
