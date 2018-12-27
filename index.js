const Botkit = require('botkit')
const consola = require('consola')
const dotenv = require('dotenv')
const express = require('express')
const GoogleImages = require('google-images')
const randomInt = require('random-int')

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

if (env === 'development') {
  dotenv.config()
}

const googleImagesClient = new GoogleImages(
  process.env.CUSTOM_SEARCH_ENGINE_ID,
  process.env.GOOGLE_APIS_API_KEY
)

const app = express()

const controller = Botkit.slackbot({
  debug: false,
  retry: Infinity,
  clientSigningSecret: process.env.SLACK_SIGNING_SECRET
})

const bot = controller.spawn({
  token: process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN
})

bot.startRTM(function(err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack')
  }

  consola.success(`Connect to ${payload.team.domain}.slack.com`)
  consola.success(`My name is @${payload.self.name}`)
})

controller.hears('ping', 'direct_mention', (bot, message) => {
  bot.reply(message, 'pong')
})

controller.hears('image (.+)$', 'direct_mention', (bot, message) => {
  googleImagesClient
    .search(message.match[1], {
      safe: 'high'
    })
    .then((images) => {
      bot.reply(message, images[randomInt(9)].url)
    })
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(port, () => {
  consola.success(`Web Server is listening on port ${port}`)
})
