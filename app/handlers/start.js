/**
 * Messages that get sent after the "Get Started" button is pressed
 */

const Documents = require("./../policy/documents");
const fbLogin = require("./../policy/helpers/fbLogin");

module.exports = (payload, chat) => {
  chat.getUserProfile(payload.sender.id).then(userProfile => {
    chat
      .say(
        `Hello ${
          userProfile.first_name
        }, Welcome :) \n\nParticipate in commenting on, reviewing and annotating the I4Policy manifesto.`,
        {
          typing: true
        }
      )
      .then(() => {
        Documents(chat);
        fbLogin(chat.userId, userProfile);
      });
  });
};
