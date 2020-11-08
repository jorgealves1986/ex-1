const express = require('express');
require('express-async-errors');
const cors = require('cors');
const { json } = require('body-parser');
const { NotFoundError } = require('./errors/not-found-error');
const { errorHandler } = require('./middlewares/error-handler');
const { indexAuthorsRouter } = require('./routes/index');
const { newArticleRouter } = require('./routes/new');
const { updateArticlesRouter } = require('./routes/update');
const { deleteArticlesRouter } = require('./routes/delete');

const app = express();
app.use(cors());
app.use(
  json({
    limit: '20mb'
  })
);

app.use(indexAuthorsRouter);
app.use(newArticleRouter);
app.use(updateArticlesRouter);
app.use(deleteArticlesRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = { app };
