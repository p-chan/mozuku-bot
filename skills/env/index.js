const ga = require('../../utils/ga')
const getenv = require('../../utils/getenv')

module.exports = {
  name: 'env',
  description: '動作環境を返します',
  usage: '@mozuku env',
  execute: controller => {
    controller.hears(
      'env',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga({
          category: 'skill',
          action: 'env',
          uid: message.user
        })

        bot.reply(message, getenv())
      }
    )
  }
}
