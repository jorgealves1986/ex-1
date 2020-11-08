const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');
const { getArticles, saveArticles } = require('../db/fs-calls');

const validationOptions = [
  body('articleIds')
    .custom((articleIds) => {
      if (!Array.isArray(articleIds)) {
        return false;
      }
      if (!articleIds.length) {
        return false;
      }
      for (const id of articleIds) {
        if (typeof id !== 'number') {
          return false;
        }
      }
      return true;
    })
    .withMessage('articleIds must be an array of numbers')
];

const router = express.Router();

router.delete(
  '/endpoint_d',
  validationOptions,
  validateRequest,
  async (req, res) => {
    const articles = await getArticles();

    const updatedArticlesList = articles.filter((article) => {
      return !req.body.articleIds.includes(article.id);
    });

    await saveArticles(updatedArticlesList);

    res.status(204).send();
  }
);

module.exports = { deleteArticlesRouter: router };
