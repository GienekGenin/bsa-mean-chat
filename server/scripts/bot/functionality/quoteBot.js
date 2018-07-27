/**
 * Quote request handler.
 *
 * @returns {string} response with random quote.
 */
module.exports = function quoteBotRes() {
  let quotes = [
    '\"People who masturbate with the door unlocked are braver than the US marines.\" - Donald J. Trump',
    '\"You miss 100% of the shots you don\'t take.\" - Michael Scott',
    'If people talking about u behind your back, then just fart.',
    'If u put laptop on the desk does that make it a desktop?. - Jaden Smith',
    'Will Will Smith smith Will Smith?. Yes, Will Smith will smith Will Smith. - Will Smith'
  ];
  function randomNumber(end) {
    return Math.floor(Math.random() * end);
  }
  return quotes[randomNumber(quotes.length)]
};
