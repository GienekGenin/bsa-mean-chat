const weatherReqHandler = require('./functionality/weatherBot');
const currencyReqHandler = require('./functionality/currencyBot');
const noteReqHandler = require('./functionality/noteBot');
const quoteReqHandler = require('./functionality/quoteBot');
const questionReqHandler = require('./functionality/questionBot');
const randomReqHandler = require('./functionality/randomBot');

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
  /**
   * Tests every pattern on incoming message.
   *
   * @param {string} msg sent by user.
   *
   * @returns {string} type of request.
   */
  check(msg) {
    for (let i = 0; i < this.botReqPatterns.length; i++) {
      if (this.botReqPatterns[i][0].test(msg)) {
        return this.botReqPatterns[i][1];
      }
    }
  }
}

// facade pattern
class BotResponse {
  constructor(typeOfReq) {
    this.typeOfReq = typeOfReq;
  }

  /**
   * Calls function depends on type of incoming request.
   *
   * @param {string} msg from user.
   *
   * @returns {string} message from bot.
   */
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

// facade pattern
class handler {
  check(msg) {
    let typeOfReq = new DetectTypeOfRequest().check(msg);
    return new BotResponse(typeOfReq).answerOn(msg);
  }
}

module.exports = handler;
