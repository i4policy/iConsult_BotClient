/**
 * This module is for sending first name, last name and messenger id to the api and receiving auth_token and userId
 */

const cache = require("memory-cache");
const axios = require("axios");

module.exports = (messenger_id, userProfile) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/users/botLogin", {
        id: messenger_id,
        name: `${userProfile.first_name} ${userProfile.last_name}`
      })
      .then(function(response) {
        // values will be cached for 1 week
        cache.put("auth_token", response.data.auth_token, 604800016);
        cache.put("userId", response.data.id, 604800016);
        resolve(response);
      })
      .catch(function(error) {
        console.log(error);
        reject(error);
      });
  });
};
