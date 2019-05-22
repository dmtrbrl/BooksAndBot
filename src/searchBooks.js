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
  console.log(url);

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
        if (thumb_url.indexOf("nophoto") === -1) {
          // Get a large cover instead of medium
          let n = thumb_url.lastIndexOf("m/");
          thumb_url =
            thumb_url.slice(0, n) + thumb_url.slice(n).replace("m/", "l/");
        }
        return {
          title,
          author,
          url,
          thumb_url
        };
      });
  } catch (error) {
    console.log(error);
  }

  return data;
};
