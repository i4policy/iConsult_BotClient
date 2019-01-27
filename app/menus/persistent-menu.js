/**
 * The Menu displayed at the bottom of the screen
 */

module.exports = bot => {
  bot.setPersistentMenu([
    {
      type: "postback",
      title: "📚 Documents",
      payload: JSON.stringify({
        type: "documents"
      })
    },
    {
      type: "postback",
      title: "🔎 About Us",
      payload: "ABOUT_US"
    },
    {
      type: "web_url",
      url: `https://manifesto.i4policy.org/`,
      title: "🌐 Visit our Website"
    }
  ]);
};
