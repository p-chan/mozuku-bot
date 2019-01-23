const suddendeath = require('suddendeath')

module.exports = {
  name: 'balloon',
  description: '突然の死のアスキーアートを生成します',
  usage: '@mozuku balloon [keyword]',
  execute: (controller) => {
    controller.hears('balloon (.+)$', 'direct_mention', (bot, message) => {
      const str = `\`\`\`${suddendeath(message.match[1])}\`\`\``
      bot.reply(message, str)
    })
  }
}
