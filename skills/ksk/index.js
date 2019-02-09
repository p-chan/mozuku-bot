const ga = require('../../utils/ga')
const getenv = require('../../utils/getenv')

const maxKskNum = 30

module.exports = {
  name: 'ksk',
  description: '加速します',
  usage: '@mozuku ksk [number]',
  execute: controller => {
    controller.hears(
      'ksk (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga({
          category: 'skill',
          action: 'ksk',
          uid: message.user
        })

        const kskNum = Number(message.match[1])
        let kskStr = ''

        if (typeof kskNum !== 'number') {
          return bot.reply(message, '数字を入力してください...')
        }

        if (kskNum < 1 || kskNum > maxKskNum) {
          return bot.reply(message, `1~${maxKskNum} で入力してください...`)
        }

        for (let i = 0; i < kskNum; i++) {
          kskStr += 'ksk\n'
        }

        bot.reply(message, kskStr)
      }
    )
  }
}
