'use sticy'
const joi = require('joi')
const lib = require('.')
// const Errors = require('proxy-engine-errors')

module.exports = {
  validateProxyAnalyticsConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, lib.Schemas.proxyAnalyticsConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.proxyAnalytics: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
