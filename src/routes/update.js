const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');
const { getArticles, saveArticles } = require('../db/fs-calls');
const { CustomError } = require('../errors/custom-error');

const validationOptions = [
  body('articles')
    .custom((articlesArray) => {
      if (!Array.isArray(articlesArray)) {
        return false;
      }
      if (!articlesArray.length) {
        return false;
      }
      const articlesWithoutId = articlesArray.filter((article) => !article.id);
      if (articlesWithoutId.length) {
        return false;
      }
      return true;
    })
    .withMessage(
      'you must provide an articles property and that property must be an array of articles'
    )
];

const router = express.Router();

router.put(
  '/endpoint_c',
  validationOptions,
  validateRequest,
  async (req, res) => {
    const articles = await getArticles();

    for (const articleNewData of req.body.articles) {
      const article = articles.find(
        (element) => element.id === articleNewData.id
      );

      if (!article) {
        throw new CustomError(
          `article with id ${articleNewData.id} not found`,
          404
        );
      }

      article.title =
        articleNewData.title === undefined
          ? article.title
          : articleNewData.title;
      article.author_id = !articleNewData.author_id
        ? article.author_id
        : articleNewData.author_id;
    }

    await saveArticles(articles);

    res.send();
  }
);

module.exports = { updateArticlesRouter: router };
