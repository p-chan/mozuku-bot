module.exports = {
  name: 'ping',
  description: '`pong` を返します',
  usage: '@mozuku ping',
  execute: controller => {
    controller.hears(
      'ping',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        bot.reply(message, 'pong')
      }
    )
  }
}
