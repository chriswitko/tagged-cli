'use strict'

const log = require('../logger')

/**
 * return tags from the console
 * @param {*} args
 */
const getTags = (args) => {
  log.debug('parse-args.getTags()', args)
  let result = {}
  args.join('').split(',').filter(tag => tag.length).map(tag => {
    result[tag] = 0
  })
  return result
}

const parseArgs = (args) => {
  return {
    tags: getTags(args)
  }
}

module.exports = parseArgs
