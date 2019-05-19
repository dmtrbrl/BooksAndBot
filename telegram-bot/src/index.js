import {} from "dotenv/config";
import Telegraf from "telegraf";

const books = [
  {
    title: "The Meaning of Birds",
    author: "by Jaye Robin Brown",
    url: "https://www.goodreads.com/book/show/37655502-the-meaning-of-birds",
    thumb_url: "https://images.gr-assets.com/books/1529559719l/37655502.jpg"
  },
  {
    title: "How To Do Nothing: Resisting the Attention Economy",
    author: "by Jenny Odell",
    url: "https://www.goodreads.com/book/show/42771901-how-to-do-nothing",
    thumb_url: "https://images.gr-assets.com/books/1550724373l/42771901.jpg"
  },
  {
    title: "Feast Your Eyes",
    author: "by Myla Goldberg",
    url: "https://www.goodreads.com/book/show/40539146-feast-your-eyes",
    thumb_url: "https://images.gr-assets.com/books/1553610295l/40539146.jpg"
  },
  {
    title: "How to Be Luminous",
    author: "by Harriet Reuter Hapgood",
    url: "https://www.goodreads.com/book/show/40864842-how-to-be-luminous",
    thumb_url: "https://images.gr-assets.com/books/1535719002l/40864842.jpg"
  },
  {
    title: "When I Arrived at the Castle",
    author: "by Emily Carroll",
    url:
      "https://www.goodreads.com/book/show/42198117-when-i-arrived-at-the-castle",
    thumb_url: "https://images.gr-assets.com/books/1538868368l/42198117.jpg"
  }
];

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply("Welcome"));
bot.on("inline_query", ctx => {
  const results = ctx.inlineQuery.query
    ? books
        .filter(book =>
          book.title.toLowerCase().includes(ctx.inlineQuery.query)
        )
        .map((book, id) => ({
          id,
          type: "article",
          title: book.title,
          description: book.author,
          thumb_url: book.thumb_url,
          input_message_content: {
            message_text: `
<strong>${book.title}</strong>
<em>${book.author}</em>
<a href="${book.thumb_url}">&#8205;</a>
          `,
            parse_mode: "HTML"
          },
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Show on Goodreads",
                  url: book.url
                }
              ]
            ]
          }
        }))
    : [];

  ctx.answerInlineQuery(results);
});
bot.launch();
