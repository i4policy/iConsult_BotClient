/**
 * This module is for sending general template cards that get displayed for Legislations, Goals and Visions
 **/

module.exports = card_obj => {
  let startFrom;

  // check if data is greater than 10. This is necessary because Facebook's Generic Template can only display 10 cards at a time
  if (card_obj.data.length > 10) {
    startFrom = card_obj.startFrom + 9;
    card_obj.data = card_obj.data.splice(0, 9);
  }

  const cards = card_obj.data.map(item => {
    const card = {
      title: item.title,
      subtitle: item.content.replace(/<[^>]+>/g, ""),
      image_url: card_obj.image_url || "",
      buttons: [
        {
          type: "postback",
          title: "👉 Read More",
          payload: JSON.stringify({
            type: "read-more",
            id: item.id,
            field: card_obj.type,
            previousId: card_obj.previousId
          })
        },
        {
          type: "postback",
          title: card_obj.buttonText,
          payload: JSON.stringify({
            type: card_obj.buttonAction,
            id: item.id,
            previousId: card_obj.previousId
          })
        }
      ]
    };

    if (card_obj.rateButton) {
      card.buttons.push({
        type: "postback",
        title: "⭐️ Rate",
        payload: JSON.stringify({
          type: "rate",
          id: item.id,
          previousId: card_obj.previousId
        })
      });
    }

    return card;
  });

  if (startFrom) {
    const moreCard = {
      title: "More",
      subtitle: `View more ${card_obj.type}`,
      image_url: "",
      buttons: [
        {
          type: "postback",
          title: "✔️ View More",
          payload: JSON.stringify({
            type: card_obj.type,
            id: card_obj.previousId,
            startFrom
          })
        }
      ]
    };

    cards.push(moreCard);
  }

  card_obj.chat.sendGenericTemplate(cards);
};
