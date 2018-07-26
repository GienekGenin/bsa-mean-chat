module.exports = function randomBotRes() {
  let randomAnswer = [
    'R u on acid?',
    'What was the question?',
    'Who is cute? U r :)',
    'Sounds good, doesn\'t work',
    'Wedding are basically funerals with cake',
    'Jesus dude, what have u smoked?',
    'I know kung fu and 50 other dangerous words',
    'There is some good shit u smoking there',
    '???',
    'Eat your foot'
  ];
  return randomAnswer[randomNumber(randomAnswer.length)]
};

function randomNumber(end) {
  return Math.floor(Math.random() * end);
}
