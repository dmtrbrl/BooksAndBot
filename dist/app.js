"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _telegraf = _interopRequireDefault(require("telegraf"));

var _searchBooks = _interopRequireDefault(require("./searchBooks"));

var createMessageText = function createMessageText(book) {
  return "\n<strong>".concat(book.title, "</strong>\n<em>").concat(book.author, "</em>\n<a href=\"").concat(book.thumb_url, "\">&#8205;</a>");
};

var bot = new _telegraf["default"](process.env.BOT_TOKEN);
bot.on("inline_query",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var searchResults, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _searchBooks["default"])(ctx.inlineQuery.query);

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
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
bot.launch();