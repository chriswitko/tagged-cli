'use strict'

const logger = require('../bin/logger')
const should = require('should')

const files = {
  tags: ['uno', 'duo', 'tres']
}

describe('logger', function () {
  it('print debug message', (done) => {
    should(logger.debug('debug')).be.equal('DEBUG: debug')
    done()
  })

  it('print error message', (done) => {
    should(logger.error('error')).be.equal('ERROR: error')
    done()
  })
})