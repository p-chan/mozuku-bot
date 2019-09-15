const fs = require('fs')
const HTMLDecoderEncoder = require('html-encoder-decoder')
const mkdirp = require('mkdirp')
const path = require('path')
const QRCode = require('qrcode')
const util = require('util')

module.exports = {
  name: 'qr',
  description: 'QRコードを生成します。誤り補正（QRコードのサイズ）、ファイル形式を指定する必要があります。',
  usage: '@mozuku qr [-L | -M | -Q | -H] [-png | -svg] [keyword,keyword...]',
  execute: controller => {
    controller.hears(
      'qr (.+)$',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        const mkdirpPromise = util.promisify(mkdirp)
        const botAPIFilesUploadPromise = util.promisify(bot.api.files.upload)
        let fileType = 'png'
        let target = message.match[1]
        let level = "M"

        if (/\s/.test(target)) {
          target = target.split(/\s/);

          for (let i = 0; i < target.length; i++) {
            if (i == 0) {
              level = target[0].slice(-1)
              if (level !== 'L' && level !== 'M' && level !== 'Q' && level !== 'H') {
                throw new Error("L、M、Q、Hのいずれかを入力");
              }
            }
            if (i == 1) {
              fileType = target[1].slice(1,4)
            }
            if (i == 2) {
              const firstStr = target[2].slice(0, 1)
              const lastStr = target[2].slice(-1)
              if (firstStr === '<' && lastStr === '>') {
                target = target[2].slice(1).slice(0, -1).split(",")
              }
            }
          }
        } else {
          target = target.split(",")
        }

        await mkdirpPromise(path.resolve(process.cwd(), './tmp/qr'))

        for (let j = 0; j < target.length; j++) {
          let id = j
          let filePath = path.resolve(process.cwd(), `./tmp/qr/${id}`)
          let str = HTMLDecoderEncoder.decode(target[j])
          await QRCode.toFile(`${filePath}.${fileType}`, str, {
            type: fileType,
            errorCorrectionLevel: level
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
