'use strict'

const args = require('../bin/parse-args')
const should = require('should')

describe('parse-args', function () {
  it('return array of tags', (done) => {
    should(args(['uno,dos,tres']).tags).be.eql({ uno: 0, dos: 0, tres: 0 })
    done()
  })
})