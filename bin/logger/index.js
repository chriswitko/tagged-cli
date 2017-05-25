'use strict'

/**
 * detect debug mode set by DEBUG=1 in console eg. DEBUG=1 node bin/cli
 */
const isDebugMode = process.env.DEBUG

/**
 * print debug message if debug mode is enabled
 * @param {string} message
 * @param {*} details
 */
const debug = (message, details) => {
  if (isDebugMode) {
    console.log('DEBUG', message)
    if (details) {
      console.log('\t\u21AA', details)
    }
  }
  return `DEBUG: ${message}`
}

const error = (message, details) => {
  if (isDebugMode) {
    console.log('ERROR', message)
    if (details) {
      console.log('\t\u21AA', details)
    }
  }
  return `ERROR: ${message}`
}

module.exports = {
  debug,
  error
}
