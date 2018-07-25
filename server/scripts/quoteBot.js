module.exports = function quoteBotRes() {
  return quotes[randomNumber()]
};

quotes = [
  '"People who masturbate with the door unlocked are braver than the US marines." - Donald J. Trump',
  `"You miss 100% of the shots you don't take." - Michael Scott`,
  'Than people talking about u behind your back, then just fart.',
  'If u put laptop on the desk does that make it a desktop?. - Jaden Smith',
  'Will Will Smith smith Will Smith?. Yes, Will Smith will smith Will Smith. - Will Smith'
];

function randomNumber() {
  let start = 0, end = 5;
  return Math.floor(Math.random() * end) - start;
}
