/**
 * This module is for displaying questions and saving answers
 */

const axios = require("axios");
const cache = require("memory-cache");
const sections = require("../policy/sections");
const fbLogin = require("./../policy/helpers/fbLogin");
const handlePayload = require("../utils/handle-payload");
const saveResponse = require("./helpers/save-response");

module.exports = (chat, sectionId, previousId) => {
  let question = "Please provide your comment:";
  chat.conversation(convo => {
    ask_questions(convo, question, sectionId, previousId);
  });
};

const ask_questions = (convo, question, sectionId, previousId) => {
  // ask question
  convo.ask(question, (payload, convo) => {
    // if button is clicked in the middle of conversation, handle payload
    if (payload.postback) {
      handlePayload(payload, convo);
      return;
    }
    // reply will be the text the user replies with
    let reply = payload.message.text;

    // save response
    let type = "comments";

    if (!cache.get("userId")) {
      convo.getUserProfile(convo.userId).then(userProfile => {
        fbLogin(convo.userId, userProfile).then(() => {
          saveResponse(reply, sectionId, type);
        });
      });
    } else saveResponse(reply, sectionId, type);

    // end conversation
    endConversation(convo, previousId);
  });
};

// function for ending convo and sending sections card
const endConversation = (convo, previousId) => {
  convo.say(`Thank you for your response!`);
  convo.end();

  sections(convo, previousId);
  return;
};
