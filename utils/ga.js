const consola = require('consola')
const getenv = require('./getenv')
const got = require('got')
const qs = require('qs')

module.exports = async ({
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

    const baseData = {
      v: '1',
      tid: process.env.GOOGLE_ANALYTICS_TRACKING_ID
    }

    const eventData = {
      v: baseData.v,
      tid: baseData.tid,
      uid: uid,
      t: 'event',
      ec: category,
      ea: action
    }

    if (label) {
      eventData.el = label
    }

    if (value) {
      eventData.ev = value
    }

    const pageviewData = {
      v: baseData.v,
      tid: baseData.tid,
      uid: uid,
      t: 'pageview',
      dh: 'example.com',
      dp: `/${category}/${action}`
    }

    const eventBody = qs.stringify(eventData)
    const pageviewBody = qs.stringify(pageviewData)

    return await got.post('https://www.google-analytics.com/batch', {
      body: `${eventBody}\n${pageviewBody}`
    })
  } catch (e) {
    return consola.error(e.message)
  }
}
