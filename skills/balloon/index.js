const ga = require('../../utils/ga')
const suddendeath = require('suddendeath')

module.exports = {
  name: 'balloon',
  description: '突然の死のアスキーアートを生成します',
  usage: '@mozuku balloon [keyword]',
  execute: controller => {
    controller.hears(
      'balloon (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga.event({
          category: 'skill',
          action: 'ping',
          uid: message.user
        })

        const str = `\`\`\`${suddendeath(message.match[1])}\`\`\``
        bot.reply(message, str)
      }
    )
  }
}
