'use strict'

const Service = require('trails/service')

/**
 * @module ProxyAnalyticsService
 * @description Proxy Analytics Service
 */
module.exports = class ProxyAnalyticsService extends Service {
  build() {
    const analytics = []

    for (const analytic in this.app.analytics) {
      // skip loop if the property is from prototype
      if (!this.app.analytics.hasOwnProperty(analytic)){
        continue
      }
      analytics.push(this.app.analytics[analytic])
    }
    return Promise.all(analytics.map(analytic => {
      return analytic.build()
    }))
      .then(results => {
        this.app.log.info(results)
        return
      })
  }
}

