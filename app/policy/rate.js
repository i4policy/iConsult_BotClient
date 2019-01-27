const cache = require("memory-cache");
const sections = require("../policy/sections");
const handlePayload = require("../utils/handle-payload");
const saveResponse = require("./helpers/save-response");
const fbLogin = require("./../policy/helpers/fbLogin");

const askRating = (convo, sectionId, previousId) => {
  let question = {
    text: "Please provide your rating",
    quickReplies: ["1", "2", "3", "4", "5"]
  };

  convo.ask(question, (payload, convo) => {
    // if button is clicked in the middle of conversation, handle payload
    if (payload.postback) {
      handlePayload(payload, convo);
      return;
    }

    let reply = parseInt(payload.message.text);

    // if the users send text instead of number, ask them to provide a proper reply
    if (isNaN(parseInt(reply))) {
      convo
        .say(`Please enter a Valid response`)
        .then(() => {
          askRating(convo, sectionId, previousId);
        })
        .catch(() => {
          askRating(convo, sectionId, previousId);
        });
      return;
    }

    // save response
    let type = "ratings";

    if (!cache.get("userId")) {
      convo.getUserProfile(convo.userId).then(userProfile => {
        fbLogin(convo.userId, userProfile).then(() => {
          saveResponse(reply, sectionId, type);
        });
      });
    } else saveResponse(reply, sectionId, type);

    endConversation(convo, previousId);
  });
};

const rate = (chat, sectionId, previousId) => {
  chat.conversation(convo => {
    askRating(convo, sectionId, previousId);
  });
};

const endConversation = (convo, previousId) => {
  convo.say(`Thank you for your response!`);
  convo.end();

  sections(convo, previousId);
  return;
};

module.exports = rate;
