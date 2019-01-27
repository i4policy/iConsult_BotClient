/**
 * This module is for sending "Read more" text and appending a button on the last message
 */

const axios = require("axios");

// this function gets the data for "Read More", splits the text, defines the buttons and sends content
module.exports = (chat, id, field, previousId) => {
  let fetchUrl = `/${field}?filter={"where":{"id": "${id}"}}`;

  axios
    .get(encodeURI(fetchUrl))
    .then(function(response) {
      // remove html tags from text
      let displayText = response.data.rows[0].content.replace(/<[^>]+>/g, " ");
      displayText = displayText.replace(/&amp;/g, "&");

      // split text every 70 words
      let splittedText = displayText.match(/(\w*\W*){0,70}/g).slice(0, -1);

      // after splicing, "splittedText" will contain the last paragraph which will be used to attach the buttons that need to be displayed
      let leftOverText = splittedText.splice(0, splittedText.length - 1);

      // send the splitted text
      chat.say(leftOverText).then(() => {
        // define buttons (depending on whether the field is sections or not) to be attached to the last message and pass to "SendMessage"
        const buttons = [
          {
            type: "postback",
            title:
              field === "sections" ? "📙 View Sections" : "📚 View Manifesto",
            payload: JSON.stringify({
              type: field,
              id: previousId,
              previousId: previousId
            })
          },
          {
            type: "postback",
            title: field === "documents" ? "📙 View Sections" : "📝 Comment",
            payload: JSON.stringify({
              type: field === "documents" ? "sections" : "comment",
              id: id,
              previousId: previousId
            })
          }
        ];

        if (field === "sections") {
          buttons.push({
            type: "postback",
            title: "⭐️ Rate",
            payload: JSON.stringify({
              type: "rate",
              id: id,
              previousId: previousId
            })
          });
        }

        // send the last messge along with the buttons
        chat.say({
          text: splittedText[0],
          buttons
        });
      });
      return;
    })
    .catch(function(error) {
      console.log(error);
    });
};
