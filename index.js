'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')

module.exports = class ProxyAnalyticsTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {
    // Packs
    if (!_.includes(_.keys(this.app.packs), 'express')) {
      return Promise.reject(new Error('Trailpack-proxy-cart currently only works with express!'))
    }

    if (!_.includes(_.keys(this.app.packs), 'proxy-sequelize')) {
      return Promise.reject(new Error('Trailpack-proxy-cart currently only works with trailpack-proxy-sequelize!'))
    }

    if (!_.includes(_.keys(this.app.packs), 'proxy-engine')) {
      return Promise.reject(new Error('Trailpack-proxy-cart requires trailpack-proxy-engine!'))
    }

    if (!this.app.config.proxyAnalytics) {
      return Promise.reject(new Error('No configuration found at config.proxyAnalytics!'))
    }

    return Promise.all([
      lib.Validator.validateProxyAnalyticsConfig(this.app.config.proxyAnalytics)
    ])
  }

  /**
   * TODO document method
   */
  configure () {
    this.app.api.analytics = this.app.api.analytics || {}

    return Promise.all([
      lib.ProxyAnalytics.configure(this.app),
      lib.ProxyAnalytics.addRoutes(this.app),
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

module.exports.Analytic = lib.Analytic
