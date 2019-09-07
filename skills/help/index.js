const { promisify } = require('util')
const fs = require('fs')
const package = require('../../package')
const path = require('path')

module.exports = {
  name: 'help',
  description: '実行できる全てのスキルを返します',
  usage: '@mozuku help',
  execute: async controller => {
    const fields = []
    const skillsPath = path.resolve(__dirname, '../')
    const skills = await promisify(fs.readdir)(skillsPath)

    skills.map((e, i, a) => {
      const skillPath = path.resolve(__dirname, '../', e)
      const skill = require(skillPath)

      fields[i] = {}
      fields[i].title = skill.usage
      fields[i].value = skill.description
      fields[i].short = false
    })

    controller.hears(
      'help',
      ['direct_message', 'direct_mention'],
      async (bot, message) => {
        await ga({
          category: 'skill',
          action: 'help',
          uid: message.user
        })

        bot.reply(message, {
          attachments: [
            {
              fields: fields,
              footer: `${package.name} v${package.version}`
            }
          ]
        })
      }
    )
  }
}
