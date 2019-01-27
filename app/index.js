const BootBot = require("bootbot");
const axios = require("axios");
const config = require("../config");
const start = require("./handlers/start");
const message = require("./handlers/message");
const postback = require("./handlers/postback");
const persistentMenu = require("./menus/persistent-menu");

axios.defaults.baseURL = config.API_BASE_URL;

// init bot
const bot = new BootBot({
  accessToken: config.PAGE_ACCESS_TOKEN,
  verifyToken: config.VERIFY_TOKEN,
  appSecret: config.APP_SECRET
});

console.log(config.PAGE_ACCESS_TOKEN);
console.log(config.VERIFY_TOKEN);
console.log(config.APP_SECRET);

bot.module(persistentMenu);
bot.module(postback);
bot.module(message);

//The text displayed before "Get Started" button is pressed
bot.setGreetingText(
  "Participate in commenting on, reviewing and annotating the I4Policy manifesto."
);
bot.setGetStartedButton(start);

bot.start(config.PORT);
