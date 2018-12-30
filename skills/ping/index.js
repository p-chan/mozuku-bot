module.exports = {
  name: 'ping',
  description: '`pong` を返します',
  usage: '@mozuku ping',
  execute: (controller) => {
    controller.hears('ping', 'direct_mention', (bot, message) => {
      bot.reply(message, 'pong')
    })
  }
}
