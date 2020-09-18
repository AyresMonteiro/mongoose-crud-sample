const readline = require("readline-sync");

function question(text, type = "") {
  switch(type) {
    case 'INT':
      return readline.questionInt(text);
    default:
      return readline.question(text);
  }
}

module.exports = question;
