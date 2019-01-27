module.exports = postback => {
  try {
    return JSON.parse(postback);
  } catch (ex) {
    return null;
  }
};
