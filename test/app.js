'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: require('../api'),
  config: {
    main: {
      packs: [
        require('trailpack-express'),
        require('trailpack-router'),
        require('trailpack-proxy-engine'),
        require('trailpack-proxy-sequelize'),
        require('../')
      ]
    },
    proxyAnalytics: {},
    proxyEngine: {
      live_mode: false,
      profile: 'test'
    },
    web: {
      express: require('express')
    },
    database: {
      stores: {
        sqlitedev: {
          database: 'ProxyAnalytics',
          host: '127.0.0.1',
          dialect: 'postgres',
          logging: false
        }
      },
      models: {
        defaultStore: 'sqlitedev',
        migrate: 'drop'
      }
    }
  }
}, smokesignals.FailsafeConfig)


