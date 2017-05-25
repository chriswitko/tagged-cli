'use strict'

const log = require('../logger')
const path = require('path')
const fs = require('fs')

const location = path.join(process.cwd(), '_cache_')

/**
 * verify if _cache_ folder exists and create it when missing
 * @param {func} cb
 */
const withFolder = (folder, cb) => {
  log.debug('cache.withFolder()', folder)
  fs.stat(folder, err => {
    if (err) {
      fs.mkdir(folder, err => {
        if (err) {
          return cb(`Could not create ${folder} folder`)
        } else {
          return cb(err, folder)
        }
      })
    } else {
      return cb(err, folder)
    }
  })
}

/**
 * returns filename build upon tags and folder
 * @param {string} folder
 * @param {object} tags
 * @param {func} cb
 */
const withFileName = (folder, tags, cb) => {
  log.debug('cache.withFileName()')
  let result = ''
  Object
    .keys(tags)
    .sort()
    .map(tag => {
      result += tag[0] + tag.length
    })
  const filename = `${path.join(folder, result)}.data`
  log.debug('cache.filename', filename)
  cb(filename)
}

/**
 * reads cache files based on the filename build upon tags
 * @param {object} tags
 * @param {func} cb
 */
const readFile = (folder, tags, cb) => {
  log.debug('cache.readFile()')
  withFolder(location, (_, folder) => {
    withFileName(folder, tags, filename => {
      fs.readFile(filename, 'utf8', (_, data) => {
        cb(data)
      })
    })
  })
}

/**
 * returns data from cache
 * @param {object} tags
 * @param {func} cb
 */
const get = (tags, cb) => {
  log.debug('cache.get()', tags)
  readFile(location, tags, cb)
}

/**
 * create new cache file
 * @param {object} tags
 * @param {string} data
 * @param {func} cb
 */
const set = (tags, data, cb) => {
  log.debug('cache.set()', tags)
  data = data.replace(/\r?\n?[^\r\n]*$/, '')
  withFolder(location, (_, folder) => {
    withFileName(folder, tags, filename => {
      fs.writeFile(filename, data, 'utf8', _ => {
        cb(data)
      })
    })
  })
}

module.exports = {
  withFileName,
  withFolder,
  readFile,
  get,
  set
}
