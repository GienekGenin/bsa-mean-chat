const weatherReqHandler = require('./weatherBot');
const currencyReqHandler = require('./currencyBot');
const noteReqHandler = require('./noteBot');
const quoteReqHandler = require('./quoteBot');
const questionReqHandler = require('./questionBot');
const randomReqHandler = require('./randomBot');

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
      [/@bot Delete/, 'note'],
      [/@bot show quote/, 'quote'],
      [/^@bot +.+\? *[!@#₴$%^&0*?()_+]+$/, 'question'],
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
    if (this.typeOfReq === 'question') {
      return questionReqHandler();
    } else if (this.typeOfReq === 'weather') {
      return weatherReqHandler(msg);
    } else if (this.typeOfReq === 'currency') {
      return currencyReqHandler(msg);
    } else if (this.typeOfReq === 'note') {
      return noteReqHandler(msg);
    } else if (this.typeOfReq === 'quote') {
      return quoteReqHandler();
    } else if (this.typeOfReq === 'random') {
      return randomReqHandler();
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
