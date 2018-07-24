const weatherReqHandler = require('./weatherBot');
const currencyReqHandler = require('./currencyBot');

class DetectBot {
  constructor() {
    this.pattern = new RegExp('@bot');
  }

  check(msg) {
    return this.pattern.test(msg);
  }
}

class DetectTypeOfRequest {
  constructor() {
    this.botReqPatterns = [
      [/@bot What is the weather/, 'weather'],
      [/@bot Convert/, 'currency'],
      [/@bot Save/, 'note'],
      [/@bot Show/, 'note'],
      [/@bot show quote/, 'quote'],
      [/@bot /, 'random'],
    ];
  }

  check(msg) {
    for (let i = 0; i < this.botReqPatterns.length; i++) {
      if (this.botReqPatterns[i][0].test(msg)) {
        return this.botReqPatterns[i][1];
      }
    }
  }
}

class BotResponse {
  constructor(typeOfReq) {
    this.typeOfReq = typeOfReq;
  }

  answerOn(msg) {
    if (this.typeOfReq === 'random') {
      // return randomReqHandler(msg);
    } else if (this.typeOfReq === 'weather') {
      return weatherReqHandler(msg);
    } else if (this.typeOfReq === 'currency') {
      return currencyReqHandler(msg);
    } else if (this.typeOfReq === 'note') {
      // return noteReqHandler(msg);
    } else if (this.typeOfReq === 'quote') {

    }
  }
}



class handler {
  check(msg) {
    let isReq = new DetectBot().check(msg);
    let typeOfReq = isReq ? new DetectTypeOfRequest().check(msg) : false;
    return new BotResponse(typeOfReq).answerOn(msg);
  }
}

module.exports = handler;

/*

function parseBot(msg) {
  if (/@bot What is the weather/.handler(msg)) {
    weatherReqHandler(msg);
  }
  if (/@bot Convert/.handler(msg)) {
    convertCurrency(msg);
  }
  if (/@bot Save/.handler(msg) || /@bot Show/.handler(msg)) {
    noteHandler(msg);
  }
  if (/@bot show quote/.handler(msg)) {
    showQuote(msg);
  }
}



function convertCurrency() {
  console.log('convertCurrency');
}

function noteHandler() {
  console.log('noteHandler');
}

function showQuote() {
  console.log('showQuote');
}



class handleRequest {
  constructor(){
    this.botReqPatterns = [/@bot What is the weather/, /@bot Convert/, /@bot Save/, /@bot Show/, /@bot show quote/];
  }

  check(msg) {
    for (let i = 0; i < this.botReqPatterns.length; i++) {
      if(this.botReqPatterns[i].handler(msg)){
        return this.botReqPatterns[i];
      }
    }
  }
}

 */
