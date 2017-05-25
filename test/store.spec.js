'use strict'

const store = require('../bin/store')
const should = require('should')

const data = {
  'name': 'First object',
  'tags': ['diam', 'ipsum', 'consectetur']
}

describe('store', function () {
  it('add key to store', (done) => {
    should(store.setKey('uno', {})).be.eql({uno: 1})
    done()
  })

  it('create initial store', (done) => {
    should(store.create(data, {diam: 0, ipsum: 0, consectetur: 0})).be.eql({diam: 1, ipsum: 1, consectetur: 1})
    done()
  })
})
