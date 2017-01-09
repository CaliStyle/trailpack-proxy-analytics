'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')

module.exports = class ProxyAnalyticsTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * TODO document method
   */
  configure () {
    return Promise.all([
      lib.ProxyAnalytics.addPolicies(this.app),
      lib.ProxyAnalytics.addRoutes(this.app),
      lib.ProxyAnalytics.addAgenda(this.app),
      lib.ProxyAnalytics.copyDefaults(this.app)
    ])
  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

