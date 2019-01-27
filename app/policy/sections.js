/**
 * This module fetches the Visions and passes them on to sendCards
 */

const axios = require("axios");
const sendCards = require("./helpers/send-cards");
const cache = require("memory-cache");

module.exports = (chat, documentId, startFrom = 0) => {
  const sectionsUrl = `/sections?filter={"where":{"documentId": "${documentId}"},"offset":${startFrom}}`;
  axios
    .get(encodeURI(sectionsUrl))
    .then(function(response) {
      const sections = response.data.rows;
      sendCards({
        chat,
        startFrom,
        data: sections,
        type: "sections",
        buttonText: "📝 Comment",
        buttonAction: "comment",
        previousId: documentId,
        rateButton: true
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  cache.put("documentId", documentId);
};
