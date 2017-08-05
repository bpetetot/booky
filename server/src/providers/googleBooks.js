/**
 * Google Books Provider
 * https://developers.google.com/books/docs/overview
 */

const fetch = require('node-fetch')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')

const URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY

const convertJson = (json) => {
  if (json && json.totalItems > 0) {
    return json.items.map(({ id, volumeInfo }) => ({
      id,
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      authors: volumeInfo.authors,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      type: volumeInfo.printType,
      identifiers: volumeInfo.industryIdentifiers,
      description: volumeInfo.description,
      cover: volumeInfo.imageLinks,
      pageCount: volumeInfo.pageCount,
      dimensions: volumeInfo.dimensions,
      mainCategory: volumeInfo.mainCategory,
      categories: volumeInfo.categories,
      language: volumeInfo.language,
      saleInfo: volumeInfo.saleInfo,
    }))
  }
  return undefined
}

const fetchAPI = async (query, lang) => {
  // prepare query parameters
  const parameters = []
  parameters.push(`q=${encodeURI(query)}`)
  parameters.push(lang ? `langRestrict=${lang}` : '')
  parameters.push(`key=${API_KEY}`)

  // execute to google search
  const response = await fetch(`${URL}?${parameters.join('&')}`)
  const json = await response.json()
  return convertJson(json)
}

const getByISBN = async (isbn, lang) => {
  const results = await fetchAPI(`isbn:${isbn}`, lang)
  if (results && results.length > 0) {
    return pickBy(results[0], identity)
  }
  return undefined
}

module.exports = {
  getByISBN,
}
