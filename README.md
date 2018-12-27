# mozuku-bot

> nyarn

## Requirement

- git
- node
- heroku
- heroku-config

## Quick Start

First, clone GitHub repo.

```
$ git clone https://github.com/p-chan/mozuku-bot
$ cd mozuku-bot
```

Next, you need to set environment variables. Copy `.env.example` to `.env` . Then, write values.

```
$ cp .env.example .env
$ vi .env
```

Finally, Let's start.

```
# for development
$ npm run dev

# for production
$ npm start
```

## Deployment

Add Heroku repo to local repo.

```
$ heroku git:remote -a mozuku-bot
```

Push `.env` to Heroku.

```
$ heroku config:push
```

Let's deploy.

```
$ git add -A
$ git commit -m "Awesome commit"
$ git push heroku master
```
