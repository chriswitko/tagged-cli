'use strict'

const storage = require('../bin/storage')
const should = require('should')

const data = {
  'name': 'First object',
  'tags': ['diam', 'ipsum', 'consectetur']
}

describe('storage', function () {
  it('reads default tags', (done) => {
    const value = { lorem: 0, ipsum: 0, dolor: 0, sit: 0, amet: 0 }
    storage.withDefaultTags((_, output) => {
      should(output).be.eql(value)
      done()
    })
  })
})
