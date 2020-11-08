const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');
const {
  getArticles,
  getAuthors,
  saveArticles,
  saveAuthors
} = require('../db/fs-calls');
const { CustomError } = require('../errors/custom-error');

const validationOptions = [
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('You must provide a title for the article'),
  body('author_id')
    .optional()
    .isNumeric()
    .withMessage('author_id must be a number'),
  body('authorName')
    .custom((value, { req }) => {
      if (req.body.author_id) {
        return true;
      }
      if (!value) {
        return false;
      }
      value.toString().trim();
      return true;
    })
    .withMessage('you must either provide an author_id or authorName')
];

const router = express.Router();

router.post(
  '/endpoint_b',
  validationOptions,
  validateRequest,
  async (req, res) => {
    const { author_id, authorName, title } = req.body;
    const authors = await getAuthors();
    const articles = await getArticles();

    if (author_id && !authors.find((author) => author.id === author_id)) {
      throw new CustomError('The author_id provided does not exists', 404);
    }

    let lastArticleIndex = articles[0].id;
    for (let i = 0; i < articles.length; i++) {
      if (lastArticleIndex < articles[i].id) {
        lastArticleIndex = articles[i].id;
      }
    }

    let lastAuthorIndex;
    if (!author_id) {
      lastAuthorIndex = authors[0].id;
      for (let i = 0; i < authors.length; i++) {
        if (lastAuthorIndex < authors[i].id) {
          lastAuthorIndex = authors[i].id;
        }
      }

      authors.push({
        id: lastAuthorIndex + 1,
        name: authorName,
        country_code: ''
      });

      await saveAuthors(authors);
    }

    const newArticle = {
      id: lastArticleIndex + 1,
      author_id: author_id ? author_id : lastAuthorIndex + 1,
      title: title
    };
    articles.push(newArticle);

    await saveArticles(articles);

    res.status(201).send(newArticle);
  }
);

module.exports = { newArticleRouter: router };
