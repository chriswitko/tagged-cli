'use strict'

const path = require('path')
const cache = require('../bin/cache')
const should = require('should')

const location = path.join(process.cwd(), '_cache_')

const tags = {
  ipsum: 1,
  dolor: 2,
  amet: 3,
  lorem: 0,
  sit: 0
}


describe('cache', function () {
  it('check available public methods', (done) => {
    should(cache).be.a.Object()
    done()
  })

  it('set cache to a file', (done) => {
    cache.set(tags, '_cache_', output => {
      should(output).be.String()
      done()
    })
  })

  it('get cache from a file', (done) => {
    cache.get(tags, output => {
      should(output).be.String()
      done()
    })
  })

  it('reads file', (done) => {
    cache.readFile(location, tags, output => {
      should(output).be.String()
      done()
    })
  })

  it('create temp folder', (done) => {
    const value = '_temp_'
    cache.withFolder(value, (err, folder) => {
      should(err).be.equal(err)
      should(folder).be.equal(value)
      done()
    })
  })

  it('should report folder error', (done) => {
    const value = 'Could not create c:/!!!!#/@ folder'
    cache.withFolder('c:/!!!!#/@', (err) => {
      should(err).be.equal(value)
      done()
    })
  })

  it('should create filename', (done) => {
    const value = '/Users/chris/projects/stuff/node-exam/_cache_/a4d5i5l5s3.data'
    cache.withFileName(location, tags, (filename) => {
      should(filename).be.equal(value)
      done()
    })
  })
})
