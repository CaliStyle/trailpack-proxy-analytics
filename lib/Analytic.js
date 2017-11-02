'use strict'

module.exports = class Analytic {
  constructor (app) {
    Object.defineProperties(this, {
      app: {
        enumerable: false,
        value: app
      },
      /**
       * If the analytic is now immutable
       */
      immutable: {
        enumerable: false,
        value: false,
        writable: true
      },
      /**
       * Freezes the immutability of the analytic
       */
      freeze: {
        enumerable: false,
        value: function () {
          this.immutable = true
        },
        writable: true
      },
      /**
       * Unfreezes the immutability of the analytic
       */
      unfreeze: {
        enumerable: false,
        value: function () {
          this.immutable = false
        },
        writable: true
      }
    })
  }

}
