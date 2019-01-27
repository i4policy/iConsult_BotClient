const axios = require("axios");
const cache = require("memory-cache");

module.exports = (reply, sectionId, type) => {
  let userId = cache.get("userId");
  let auth_token = cache.get("auth_token");
  let post_url = encodeURI(
    `/${type}/upsertWithWhere?where={"userId": "${userId}","sectionId": "${sectionId}"}`
  );
  axios
    .post(
      post_url,
      {
        sectionId,
        content: reply,
        userId
      },
      {
        headers: {
          Authorization: auth_token
        }
      }
    )
    .then(function(response) {
      //console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
