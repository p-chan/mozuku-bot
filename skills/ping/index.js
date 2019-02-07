const ga = require('../../utils/ga')

module.exports = {
  name: 'ping',
  description: '`pong` を返します',
  usage: '@mozuku ping',
  execute: controller => {
    controller.hears('ping', 'direct_mention', async (bot, message) => {
      await ga.event({
        category: 'skill',
        action: 'ping',
        uid: message.user
      })

      bot.reply(message, 'pong')
    })
  }
}
