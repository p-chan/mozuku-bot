const consola = require('consola')
const getenv = require('./getenv')
const got = require('got')
const qs = require('qs')

module.exports = {
  event: async ({
    category = null,
    action = null,
    label = null,
    value = null,
    uid = null
  } = {}) => {
    if (getenv() !== 'production' || !process.env.GOOGLE_ANALYTICS_TRACKING) {
      return
    }

    try {
      if (!process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
        throw new Error('Google Analytics Tracking ID is required')
      }

      if (!category || !action || !uid) {
        throw new Error('category, action and uid are required')
      }

      const data = {
        v: '1',
        tid: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        uid: uid,
        t: 'event',
        ec: category,
        ea: action
      }

      if (label) {
        data.el = label
      }

      if (value) {
        data.ev = value
      }

      return await got.post('https://www.google-analytics.com/collect', {
        body: qs.stringify(data)
      })
    } catch (e) {
      return consola.error(e.message)
    }
  }
}
