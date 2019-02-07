const getenv = require('../../utils/getenv')

module.exports = {
  name: 'env',
  description: '動作環境を返します',
  usage: '@mozuku env',
  execute: controller => {
    controller.hears('env', 'direct_mention', (bot, message) => {
      bot.reply(message, getenv())
    })
  }
}
