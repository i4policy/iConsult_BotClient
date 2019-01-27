/**
 * This module handles postbacks
 */

const documents = require("../policy/documents");
const sections = require("../policy/sections");
const comment = require("../policy/comment");
const rate = require("../policy/rate");
const about = require("../policy/about-us");
const readMore = require("../policy/helpers/send-text");
const parseJSON = require("./../utils/parse-json");

module.exports = bot => {
  bot.on("postback", (payload, chat) => {
    const postback = payload.postback.payload;
    const data = parseJSON(postback);

    if (data) {
      switch (data.type) {
        case "documents":
          documents(chat, data.startFrom);
          break;
        case "sections":
          sections(chat, data.id, data.startFrom);
          break;
        case "comment":
          comment(chat, data.id, data.previousId, data.type);
          break;
        case "rate":
          rate(chat, data.id, data.previousId, data.type);
          break;
        case "read-more":
          readMore(chat, data.id, data.field, data.previousId);
          break;
        default:
          console.log(`Unhandled Postback: ${postback}`);
          break;
      }
      return;
    }

    switch (postback) {
      case "BOOTBOT_GET_STARTED":
        break;
      case "DOCUMENTS":
        documents(chat);
        break;
      case "ABOUT_US":
        about(chat);
        break;
      default:
        console.log(`Unhandled Postback: ${postback}`);
        break;
    }
  });
};
