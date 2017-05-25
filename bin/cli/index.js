'use strict'

const log = require('../logger')
const path = require('path')

const parseArgs = require('../parse-args')
const store = require('../store')
const storage = require('../storage')
const cache = require('../cache')

const dataFolder = path.join(process.cwd(), '/data/')
log.debug(`cli.initializing data folder`, dataFolder)

const processArgv = parseArgs(process.argv.slice(2))
const tags = processArgv.tags
log.debug(`cli.read tags from cli`, tags)

/**
 * search filfes for tags
 * @param {*} err
 * @param {object} files
 * @param {object} tags
 * @param {func} cb
 */
const searchInFiles = (err, files, tags, cb) => {
  log.debug(`cli.searchInFiles()`)
  if (err) {
    throw err
  }

  log.debug(`cli.read valid json files`)

  files.map(file => {
    store.create(JSON.parse(file), tags)
    log.debug(`cli.store updated`, tags)
  })

  cache.set(tags, store.print(tags), output => {
    cb(output)
  })
}

/**
 * print results from cache or files
 * @param {object} tags
 * @param {string} dataFolder
 * @param {func} cb
 */
const printResults = (tags, dataFolder, cb) => {
  log.debug(`cli.printResults()`)

  cache.get(tags, (data) => {
    if (data) {
      cb(data)
    } else {
      storage.init(dataFolder, (err, files) => searchInFiles(err, files, tags, cb))
    }
  })
}

/**
 * run the cli process
 * @param {object} tags
 * @param {folder} dataFolder
 */
const run = (tags, dataFolder) => {
  log.debug(`cli.run()`)
  if (Object.keys(tags).length) {
    log.debug(`cli.get custom tags`)
    printResults(tags, dataFolder, data => console.log(data))
  } else {
    storage.withDefaultTags((err, tags) => {
      log.debug(`cli.get default tags`)
      if (err || !tags) {
        log.debug('cli.get default tags', err)
        console.log('No tags provided in the fallback file')
      } else {
        printResults(tags, dataFolder, data => console.log(data))
      }
    })
  }
}

/**
 * run
 */
run(tags, dataFolder)
