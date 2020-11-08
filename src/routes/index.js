const express = require('express');
const {
  getPaginationOptions
} = require('../middlewares/get-pagination-options');
const { getAuthors, getArticles, getCountries } = require('../db/fs-calls');
const { paginationHandler } = require('../Utils/pagination-handler');

const router = express.Router();

router.get('/endpoint_a', getPaginationOptions, async (req, res) => {
  const authors = await getAuthors();
  const articles = await getArticles();
  const countries = await getCountries();

  for (const author of authors) {
    author.country = !author.country_code
      ? ''
      : countries[author.country_code.toLowerCase()];
    author.articles = articles.filter(
      (article) => article.author_id === author.id
    );
    delete author.country_code;
  }

  res.send(paginationHandler(req.paginationOptions, authors));
});

module.exports = { indexAuthorsRouter: router };
