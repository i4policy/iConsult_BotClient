/**
 * this module handles Payloads that interrupt a conversation. eg - if a button is pressed during a conversation
 */

module.exports = (payload, convo) => {
  if (payload.postback) {
    convo.bot._handleEvent("postback", payload);
    convo.end();
    return;
  }
};
