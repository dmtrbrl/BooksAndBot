# BooksAndBot

[@BooksAndBot](https://telegram.me/BooksAndBot) is an inline bot that allows you to search for books and share them in a conversation.

Powered by [Goodreads](https://www.goodreads.com/).

## Demo

![How it works](https://github.com/dmtrbrl/BooksAndBot/blob/master/demo/demo.gif?raw=true)

## Development

1. You'll need a few things:

- A Telegram bot token. Contact [@BotFather](http://telegram.me/BotFather) in order to create a new bot and receive a token.
- A Goodreads API key. Apply for one [here](https://www.goodreads.com/api).

2. Create `.env` file in the root directory with following variables:

```shell
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
GOODREADS_API_KEY=YOUR_GOODREADS_API_KEY
```

3. Install dependencies and start the app:

```shell
npm i
npm start
```
