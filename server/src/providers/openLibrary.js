/**
 * Open library
 * https://openlibrary.org/dev/docs/api/books
 */

const fetch = require('node-fetch')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')

const URL = 'https://openlibrary.org/api/books'

const convertJson = (json) => {
  if (json) {
    return ({
      title: json.title,
      subtitle: json.subtitle,
      authors: json.authors && json.authors.map(author => author.name),
      publisher: json.publishers && json.publishers.map(publisher => publisher.name),
      publishedDate: json.publish_date,
      identifiers: json.identifiers,
      cover: json.cover,
      pageCount: json.number_of_pages,
    })
  }
  return undefined
}

const fetchAPI = async (query) => {
  // prepare query parameters
  const parameters = []
  parameters.push(`bibkeys=${encodeURI(query)}`)
  parameters.push('format=json')
  parameters.push('jscmd=data')

  // execute to google search
  const response = await fetch(`${URL}?${parameters.join('&')}`)
  const json = await response.json()
  return convertJson(json[query])
}

const getByISBN = async (isbn, lang) => {
  const result = await fetchAPI(`ISBN:${isbn}`, lang)
  return pickBy(result, identity)
}

module.exports = {
  getByISBN,
}
