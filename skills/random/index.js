module.exports = {
  name: 'random',
  description: 'ランダムで値を返します',
  usage: '@mozuku random [...arg]',
  execute: controller => {
    controller.hears(
      'random (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        const arr = message.match[1].split(/[ ,]+/)
        const str = arr[Math.floor(Math.random() * arr.length)]
        bot.reply(message, str || 'にゃーん')
      }
    )
  }
}
