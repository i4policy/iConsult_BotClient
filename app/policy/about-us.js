/**
 * This module is for sending About us content
 */

module.exports = chat => {
  chat.say("We are innovators for public policy.").then(() => {
    chat
      .say(
        "Innovation hubs and other startup catalysts are contributing to public policy across Africa to accelerate economic development and youth employment.",
        { typing: true }
      )
      .then(() => {});
  });
};
