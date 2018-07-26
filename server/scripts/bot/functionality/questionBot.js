module.exports = function questionBotRes() {
  let freeAdvise = [
    'Make her pussy wet, not her eyes',
    `Always salt your pasta while boiling`,
    'Break her bed, not her heart',
    'Make his dick hard, not his life',
    'Before u take a shit, make sure there is a toilet paper'
  ];
  return freeAdvise[randomNumber(freeAdvise.length)];
};


function randomNumber(end) {
  return Math.floor(Math.random() * end);
}
