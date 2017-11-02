/* eslint no-console: [0] */
'use strict'

const _ = require('lodash')
const routes = require('./routes')
const trailsCore = require('trails/lib').Core
// const routeOrder = require('trailpack-proxy-engine/lib/utils').routeOrder

module.exports = {

  /**
   * init - Initialize
   * @param app
   */
  init: (app) => {
    // const proxyAnalytics = app.services.ProxySocialService.proxyAnalytics
  },

  /**
   * init - Initialize
   * @param app
   */
  configure: (app) => {
    // Define New properties on app
    Object.defineProperties(app, {
      analytics: {
        enumerable: true,
        writable: false,
        value: {}
      }
    })

    // Bind the Methods
    Object.assign(app.analytics, trailsCore.bindMethods(app, 'analytics'))

    return
  },

  /**
   * addRoutes - Add the Proxy Router controller routes
   * @param app
   */
  addRoutes: (app) => {
    const prefix = _.get(app.config, 'proxyAnalytics.prefix') || _.get(app.config, 'footprints.prefix')
    const routerUtil = app.packs.router.util
    if (prefix){
      routes.forEach(route => {
        route.path = prefix + route.path
      })
    }
    app.config.routes = routerUtil.mergeRoutes(routes, app.config.routes)
    return Promise.resolve({})
  },
  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app) => {
    app.config.proxyAnalyticsDefaults = _.clone(app.config.proxyAnalytics)
    return Promise.resolve({})
  }
}
