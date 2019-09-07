const GoogleImages = require('google-images')
const randomInt = require('random-int')

const googleImagesClient = new GoogleImages(
  process.env.CUSTOM_SEARCH_ENGINE_ID,
  process.env.GOOGLE_APIS_API_KEY
)

module.exports = {
  name: 'image',
  description: 'キーワードにマッチした画像のURLを返します',
  usage: '@mozuku image [keyword]',
  execute: controller => {
    controller.hears(
      'image (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga({
          category: 'skill',
          action: 'image',
          uid: message.user
        })

        googleImagesClient
          .search(message.match[1], {
            safe: 'high'
          })
          .then(images => {
            bot.reply(message, images[randomInt(9)].url)
          })
      }
    )
  }
}
