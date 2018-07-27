const randomReqHandler = require('./randomBot');

/**
 * Checks pattern of message, looks for currency types and amount.
 *
 * @param {string} msg from user.
 *
 * @returns {string} response with converted value.
 */
module.exports = function currencyReqHandler(msg) {
  let currency = ['dollar', 'euro', 'hryvnia'];
  let catchAmount = new RegExp(/[0-9]+/);
  let amount = +catchAmount.exec(msg);
  for (let i = 0; i < currency.length; i++) {
    let patt = new RegExp(`@bot Convert ${amount} ${currency[i]}`);
    if (patt.test(msg)) {
      for (let c = 0; c < currency.length; c++) {
        let patt = new RegExp(`@bot Convert ${amount} ${currency[i]} to ${currency[c]}`);
        if (patt.test(msg)) {
          return(bankomat(amount, currency[i], currency[c]));
        }
      }
    }
  }
  return randomReqHandler();
};

/**
 * Convert one currency into another.
 *
 * @param {number} amount of money.
 * @param {string} currency_A - type of currency.
 * @param {string} currency_B - type of currency.
 *
 * @returns {string} response with converted value.
 */
function bankomat(amount, currency_A, currency_B) {
  let UAHUSD = 0.038;
  let EURUSD = 1.17;
  let result;
  if (currency_A === 'hryvnia' && currency_B === 'euro') {
    result = amount * UAHUSD / EURUSD;
  } else if (currency_A === 'euro' && currency_B === 'hryvnia') {
    result = amount * EURUSD / UAHUSD;
  } else if (currency_A === 'hryvnia' && currency_B === 'dollar') {
    result = amount * UAHUSD;
  } else if (currency_A === 'dollar' && currency_B === 'hryvnia') {
    result = amount / UAHUSD;
  } else if (currency_A === 'euro' && currency_B === 'dollar') {
    result = amount * EURUSD;
  } else if (currency_A === 'dollar' && currency_B === 'euro') {
    result = amount / EURUSD;
  } else if (currency_A === currency_B) {
    result = amount;
  }
  return `${Math.round(result * 100) / 100} ${currency_B}`;
}
