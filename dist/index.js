"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("dotenv/config");

var _telegraf = _interopRequireDefault(require("telegraf"));

var _searchBooks = _interopRequireDefault(require("./searchBooks"));

var BOT_TOKEN = process.env.BOT_TOKEN || "";
var PORT = process.env.PORT || 3000;
var URL = process.env.URL || "https://books-and-bot.herokuapp.com/";

var createMessageText = function createMessageText(book) {
  return "\n<strong>".concat(book.title, "</strong>\n<em>").concat(book.author, "</em>\n<a href=\"").concat(book.cover_url, "\">&#8205;</a>");
};

var bot = new _telegraf["default"](BOT_TOKEN);
bot.on("inline_query", function _callee(ctx) {
  var searchResults, results;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap((0, _searchBooks["default"])(ctx.inlineQuery.query));

        case 2:
          searchResults = _context.sent;
          results = searchResults && searchResults.length ? searchResults.map(function (book, id) {
            return {
              id: id,
              type: "article",
              title: book.title,
              description: book.author,
              thumb_url: book.thumb_url,
              input_message_content: {
                message_text: createMessageText(book),
                parse_mode: "HTML"
              },
              reply_markup: {
                inline_keyboard: [[{
                  text: "Show on Goodreads",
                  url: book.url
                }]]
              }
            };
          }) : [];
          ctx.answerInlineQuery(results);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
bot.telegram.setWebhook("".concat(URL, "/bot").concat(BOT_TOKEN));
bot.startWebhook("/bot".concat(BOT_TOKEN), null, PORT);
bot.launch();