const Botkit = require('botkit')
const consola = require('consola')
const dotenv = require('dotenv')
const express = require('express')

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

if (env === 'development') {
  dotenv.config()
}

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

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(port, () => {
  consola.success(`Web Server is listening on port ${port}`)
})
