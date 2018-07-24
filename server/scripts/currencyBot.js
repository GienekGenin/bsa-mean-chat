module.exports = function currencyReqHandler(msg) {
  let currency = ['dollar', 'euro', 'hryvnia'];
  let catchAmount = new RegExp(/[0-9]+/);
  let amount = catchAmount.exec(msg);
  for (let i = 0; i < currency.length; i++) {
    let patt = new RegExp(`@bot Convert ${amount} ${currency[i]}`);
    if (patt.test(msg)) {
      for (let c = 0; c < currency.length; c++) {
        let patt = new RegExp(`@bot Convert ${amount} ${currency[i]} to ${currency[c]}`);
        if (patt.test(msg)) {
          return(bankomat(amount, currency, currency[i], currency[c]));
        }
      }
    }
  }
};

function bankomat(amount, currencyArr, currency_A, currency_B) {
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
  }
  return `${Math.round(result * 100) / 100} ${currency_B}`;
}