"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("dotenv/config");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

var _xml2jsEs6Promise = _interopRequireDefault(require("xml2js-es6-promise"));

var _callee = function _callee(query) {
  var data, url, response, text, js;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (query) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", null);

        case 2:
          query = _querystring["default"].escape(query);
          data = null;
          url = "https://www.goodreads.com/search/index.xml?key=".concat(process.env.GOODREADS_API_KEY, "&q=").concat(query, "&field=title");
          _context.prev = 5;
          _context.next = 8;
          return _regenerator["default"].awrap((0, _nodeFetch["default"])(url));

        case 8:
          response = _context.sent;
          _context.next = 11;
          return _regenerator["default"].awrap(response.text());

        case 11:
          text = _context.sent;
          _context.next = 14;
          return _regenerator["default"].awrap((0, _xml2jsEs6Promise["default"])(text));

        case 14:
          js = _context.sent;
          if (js.GoodreadsResponse) data = js.GoodreadsResponse.search[0].results[0].work.map(function (result) {
            var book = result.best_book[0];
            var title = book.title[0];
            var author = "by ".concat(book.author.map(function (a) {
              return a.name;
            }).join(", "));
            var url = "https://www.goodreads.com/book/show/".concat(book.id[0]._);
            var thumb_url = book.image_url[0];
            var cover_url = null; // Using dirty and unstable way to get a book cover :(

            if (thumb_url.indexOf("._SX") !== -1) {
              var n = thumb_url.lastIndexOf("._SX");
              cover_url = "".concat(thumb_url.slice(0, n), "._SY400_.jpg");
            } else if (thumb_url.indexOf("._SY") !== -1) {
              var _n = thumb_url.lastIndexOf("._SY");

              cover_url = "".concat(thumb_url.slice(0, _n), "._SY400_.jpg");
            } else {
              cover_url = thumb_url;
            }

            return {
              title: title,
              author: author,
              url: url,
              thumb_url: thumb_url,
              cover_url: cover_url
            };
          });
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);

        case 21:
          return _context.abrupt("return", data);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 18]]);
};

exports["default"] = _callee;