const nlp = require("./nlp");

module.exports = bot => {
  bot.on("message", (payload, chat, data) => {
    if (data.captured) {
      return;
    }
    nlp(chat, payload);
  });

  bot.hear(["hello", "hi"], (_, chat) => {
    chat.say("Hello");
  });

  bot.hear(["who are you", "what do you do"], (_, chat) => {
    chat.say("We are innovators for public policy");
  });

  bot.on("attachment", (_, chat) => {
    chat.say("I'm not sure I understand");
  });
};
