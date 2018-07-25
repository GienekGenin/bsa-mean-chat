module.exports = function randomBotRes() {
  return randomAnswer[randomNumber()]
};

randomAnswer = [
  'R u on acid?',
  `What was the question?`,
  'Who is cute? U r :)',
  `Sounds good, doesn't work`,
  'Wedding are basically funerals with cake',
  'Jesus dude, what have u smoked?',
  'This is some good shit there u smoking',
  '???'
];

function randomNumber() {
  let start = 0, end = 7;
  return Math.floor(Math.random() * end) - start;
}
