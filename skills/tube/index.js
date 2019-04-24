const ga = require('../../utils/ga')
const randomInt = require('random-int')
const YouTube = require('youtube-node')

const youTube = new YouTube()

youTube.setKey(process.env.GOOGLE_APIS_API_KEY)

module.exports = {
  name: 'tube',
  description: 'キーワードにマッチした YouTube の動画のURLを返します',
  usage: '@mozuku tube [keyword]',
  execute: controller => {
    controller.hears(
      'tube (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga({
          category: 'skill',
          action: 'tube',
          uid: message.user
        })

        youTube.search(message.match[1], 10, { type: 'video' }, function(
          error,
          result
        ) {
          if (error) {
            console.log(error)
          } else {
            bot.reply(
              message,
              `https://www.youtube.com/watch?v=${
                result.items[randomInt(9)].id.videoId
              }`
            )
          }
        })
      }
    )
  }
}
