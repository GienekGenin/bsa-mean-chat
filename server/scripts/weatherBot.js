module.exports = function weatherReqHandler(msg) {
  let days = ['today', 'tomorrow', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let cities = ['Lviv', 'Kyiv', 'Kharkiv', 'Odessa', 'Dnipro'];
  for (let i = 0; i < days.length; i++) {
    if (days[i] === 'today' || days[i] === 'tomorrow') {
      let rule = new RegExp('@bot What is the weather ' + days[i] + ' in ');
      if (rule.test(msg)) {
        for (let c = 0; c < cities.length; c++) {
          rule = new RegExp('@bot What is the weather ' + days[i] + ' in ' + cities[c]);
          if (rule.test(msg)) {
            return `${days[i]} the weather will be f*cking freezing in ${cities[c]}`;
          }
        }
      }
    } else {
      let rule = new RegExp('@bot What is the weather on ' + days[i] + ' in ');
      if (rule.test(msg)) {
        for (let c = 0; c < cities.length; c++) {
          rule = new RegExp('@bot What is the weather on ' + days[i] + ' in ' + cities[c]);
          if (rule.test(msg)) {
            return `The weather will be f*cking freezing on ${days[i]} in ${cities[c]}`;
          }
        }
      }
    }
  }
};
