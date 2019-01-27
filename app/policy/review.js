/**
 * This module is for displaying questions and saving answers
 */

const axios = require("axios");
const cache = require("memory-cache");
const sections = require("../policy/sections");
const fbLogin = require("./../policy/helpers/fbLogin");

module.exports = (chat, sectionId, previousId) => {
  let question = "Please provide your review:";
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
    //saveResponse(reply, sectionId, convo);
    //console.log(sectionId);
    // end conversation
    endConversation(convo, previousId);
  });
};

// function that saves the answers
const saveResponse = (reply, sectionId, convo) => {
  // if userId is not in cache, login with facebook to get it
  /* if (!cache.get("userId")) {
    convo.getUserProfile(convo.userId).then(userProfile => {
      fbLogin(convo.userId, userProfile);
      saveResponse(reply, questionId, sectionId, convo);
      return;
    });
  } */
  let userId = "test"; //cache.get("userId");
  //let auth_token = cache.get("auth_token");

  axios
    .post(
      `/comments`,
      {
        sectionId,
        content: reply,
        userId
      }
      /*    {
        headers: {
          Authorization: auth_token
        }
      } */
    )
    .then(function(response) {
      // console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const endConversation = (convo, previousId) => {
  convo.say(`Thank you for your response!`);
  convo.end();

  let sectionId = cache.get("sectionId");
  sections(convo, previousId);
  return;
};

// function that handles Payloads if a button is pressed during a conversation
const handlePayload = (payload, convo) => {
  // handles payload
  if (payload.postback) {
    convo.bot._handleEvent("postback", payload);
    convo.end();
    return;
  }
};
