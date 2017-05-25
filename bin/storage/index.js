'use strict'

const fs = require('fs')
const path = require('path')
const log = require('../logger')

/**
 * read data dir and return files
 * @param {string} folder
 * @param {fung} cb
 */
const getFiles = (folder, cb) => {
  log.debug('storage.getFiles()', folder)
  if (!cb) {
    return () => {}
  }

  fs.readdir(folder, (err, items = []) => {
    if (err) {
      cb('Missing data folder')
    }
    cb(null, items)
  })
}

/**
 * verify string if is valid json and build array with valid json
 * @param {string} folder
 * @param {array} files
 * @param {func} cb
 */
const parseJSON = (folder, files, cb) => {
  log.debug('storage.parseJSON()')
  let result = []
  let cntr = 0

  files.forEach((file) => {
    log.debug('storage.parseJSON()', file)
    fs.readFile(folder + file, 'utf8', (err, data) => {
      if (err) throw err
      try {
        if (JSON.parse(data)) {
          result.push(data)
        }
      } catch (e) {
        log.error(`${file} is not a valid json file`)
      }

      // see if we're done processing all the results
      ++cntr
      if (cntr === files.length) {
        cb(null, result)
      }
    })
  })
}

/**
 * reads default tags from file
 * @param {func} cb
 */
const withDefaultTags = cb => {
  log.debug('storage.withDefaultTags()')
  const fallbackFile = path.join(process.cwd(), '/tags.txt')
  let result = {}

  fs.readFile(fallbackFile, 'utf8', (err, data) => {
    if (err) {
      log.error('storage.withDefaultTags()', `${fallbackFile} does not exists`)
      return cb(err)
    }
    if (data) {
      data.split('\n').map(tag => {
        if (tag) {
          result[tag] = 0
        }
      })
    }
    cb(err, result)
  })
}

/**
 * init store with data from json files
 * @param {string} folder
 * @param {func} cb
 */
const init = (folder, cb) => {
  log.debug('storage.init()', folder)
  if (!folder || !cb) {
    throw new Error('No data folder defined')
  }

  getFiles(folder, (err, files) => {
    if (err) {
      throw err
    }

    parseJSON(folder, files, cb)
  })
}

module.exports = {
  init,
  withDefaultTags
}
