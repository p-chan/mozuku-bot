const ojichat = require("ojichat");

module.exports = {
  name: "ojisan",
  description: "名前を入力するとおじさん構文を返します",
  usage: "@mozuku ojisan [name]",
  execute: controller => {
    controller.hears(
      "ojisan (.+)$",
      ["direct_message", "direct_mention"],
      async (bot, message) => {
        bot.reply(message, ojichat.generateMessage(message.match[1], 4));
      }
    );
  }
};
