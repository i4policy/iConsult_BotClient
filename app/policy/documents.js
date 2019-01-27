/**
 * This module fetches the Goals and passes them on to sendCards
 */

const axios = require("axios");
const sendCards = require("./helpers/send-cards");

module.exports = (chat, startFrom = 0) => {
  const documentUrl = `/documents?filter={"offset": ${startFrom}}`;
  axios
    .get(encodeURI(documentUrl))
    .then(function(response) {
      const documents = response.data.rows;
      image_url = "https://i.imgur.com/GtE0bBr.png";
      sendCards({
        chat,
        image_url,
        startFrom,
        data: documents,
        type: "documents",
        buttonText: "📙 View Sections",
        buttonAction: "sections",
        previousId: documents[0].id
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};
