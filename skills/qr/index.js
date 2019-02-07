const fs = require('fs')
const ga = require('../../utils/ga')
const HTMLDecoderEncoder = require('html-encoder-decoder')
const mkdirp = require('mkdirp')
const path = require('path')
const QRCode = require('qrcode')
const util = require('util')
const uuidv4 = require('uuid/v4')

module.exports = {
  name: 'qr',
  description: 'QRコードを生成します',
  usage: '@mozuku qr [keyword]',
  execute: controller => {
    controller.hears(
      'qr (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga.event({
          category: 'skill',
          action: 'qr',
          uid: message.user
        })

        const mkdirpPromise = util.promisify(mkdirp)
        const botAPIFilesUploadPromise = util.promisify(bot.api.files.upload)

        const fileTypes = ['png', 'svg']

        const id = uuidv4()
        const str = HTMLDecoderEncoder.decode(message.match[1])
        const filePath = path.resolve(process.cwd(), `./tmp/qr/${id}`)

        await mkdirpPromise(path.resolve(process.cwd(), './tmp/qr'))

        for (let i = 0; i < fileTypes.length; i++) {
          const fileType = fileTypes[i]

          await QRCode.toFile(`${filePath}.${fileType}`, str, {
            type: fileType
          })

          await botAPIFilesUploadPromise({
            file: fs.createReadStream(`${filePath}.${fileType}`),
            filename: `${id}.${fileType}`,
            title: `${id}.${fileType}`,
            channels: message.channel
          })
        }
      }
    )
  }
}
