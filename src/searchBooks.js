import {} from "dotenv/config";
import fetch from "node-fetch";
import querystring from "querystring";
import xml2js from "xml2js-es6-promise";

export default async query => {
  if (!query) return null;
  query = querystring.escape(query);
  let data = null;
  const url = `https://www.goodreads.com/search/index.xml?key=${
    process.env.GOODREADS_API_KEY
  }&q=${query}&field=title`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const js = await xml2js(text);

    if (js.GoodreadsResponse)
      data = js.GoodreadsResponse.search[0].results[0].work.map(result => {
        const book = result.best_book[0];
        let title = book.title[0];
        let author = `by ${book.author.map(a => a.name).join(", ")}`;
        let url = `https://www.goodreads.com/book/show/${book.id[0]._}`;
        let thumb_url = book.image_url[0];
        let cover_url = null;

        // Using dirty and unstable way to get a book cover :(
        if (thumb_url.indexOf("._SX") !== -1) {
          let n = thumb_url.lastIndexOf("._SX");
          cover_url = `${thumb_url.slice(0, n)}._SY400_.jpg`;
        } else if (thumb_url.indexOf("._SY") !== -1) {
          let n = thumb_url.lastIndexOf("._SY");
          cover_url = `${thumb_url.slice(0, n)}._SY400_.jpg`;
        } else {
          cover_url = thumb_url;
        }

        return {
          title,
          author,
          url,
          thumb_url,
          cover_url
        };
      });
  } catch (error) {
    console.log(error);
  }

  return data;
};
