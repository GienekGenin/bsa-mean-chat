module.exports = function questionBotRes() {
  return freeAdvice[randomNumber()]
};

freeAdvice = [
  'Make her pussy wet, not her eyes',
  `Always salt your pasta while boiling`,
  'Break her bed, not her heart',
  'Make his dick hard, not his life',
  'Before u take a shit, make sure there is a toilet paper'
];

function randomNumber() {
  let start = 0, end = 5;
  return Math.floor(Math.random() * end) - start;
}
