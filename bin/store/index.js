'use strict'

const log = require('../logger')

/**
 * insert tag to an array
 * @param {string} key
 * @param {object} store
 */
const setKey = (key, store = []) => {
  log.debug('store.set()', key)
  if (!key) {
    return store
  }

  if (store[key]) {
    store[key] += 1
  } else {
    store[key] = 1
  }
  return store
}

/**
 * return output string
 * @param {object} store
 */
const print = (store = []) => {
  log.debug('store.print()', store)
  let result = ''
  sort(store).map(line => {
    result += `${line[0]}\t\t${line[1]}\n`
  })
  return result
}

/**
 * sort object by count (desc)
 * @param {object} obj
 */
const sort = obj => {
  log.debug('store.sort()', obj)
  let entries = Object.entries(obj)

  return entries.sort((a, b) => (b[1] - a[1]))
}

/**
 * creates store with provided data
 * @param {*} obj
 * @param {object} store
 */
const create = (obj, store) => {
  log.debug('store.create()', store)
  if (!obj) {
    return store
  }

  if (obj.hasOwnProperty('tags') && Array.isArray(obj['tags'])) {
    obj['tags'].map(tag => store.hasOwnProperty(tag) && setKey(tag, store))
  }

  if (obj.hasOwnProperty('children') && Array.isArray(obj['children'])) {
    obj['children'].map(entry => create(entry, store))
  } else {
    create(obj['children'], store)
  }

  return store
}

module.exports = {
  sort,
  setKey,
  create,
  print
}
