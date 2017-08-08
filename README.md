# booky

## .env file

Create a `.env` file with following keys :

```
GOOGLE_BOOKS_API_KEY=<GOOGLE_BOOKS_API_KEY>
ISBNDB_API_KEY=<ISBNDB_API_KEY>
```

## deployment

1. type `yarn`
1. create `.env` file
1. install heroku cli
1. type `heroku login`
1. type `heroku create <name> --region eu`
1. type `git push heroku master` or `yarn deploy`