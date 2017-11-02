'use strict'

const Cron = require('trailpack-proxy-engine').Cron

module.exports = class AnalyticsCron extends Cron {
  build() {
    // Every Day at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 24
    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.build', rule, () => {
      this.app.services.ProxyAnalyticsService.build()
        .catch(err => {
          this.app.log.error(err)
        })
    })
  }
}
