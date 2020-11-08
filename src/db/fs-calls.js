const fs = require('fs/promises');
const { FsError } = require('../errors/fs-error');

const getAuthors = async () => {
  try {
    const authors = await fs.readFile('data/authors.json', 'utf8');
    return JSON.parse(authors);
  } catch (error) {
    console.error(error);
    throw new FsError();
  }
};

const getArticles = async () => {
  try {
    const articles = await fs.readFile('data/articles.json', 'utf8');
    return JSON.parse(articles);
  } catch (error) {
    console.error(error);
    throw new FsError();
  }
};

const getCountries = async () => {
  try {
    const countries = await fs.readFile('data/countries.json', 'utf8');
    return JSON.parse(countries);
  } catch (error) {
    console.error(error);
    throw new FsError();
  }
};

const saveAuthors = async (authors) => {
  try {
    await fs.writeFile('data/authors.json', JSON.stringify(authors), 'utf8');
  } catch (error) {
    console.error(error);
    throw new FsError();
  }
};

const saveArticles = async (articles) => {
  try {
    await fs.writeFile('data/articles.json', JSON.stringify(articles), 'utf8');
  } catch (error) {
    console.error(error);
    throw new FsError();
  }
};

module.exports = {
  getAuthors,
  getArticles,
  getCountries,
  saveAuthors,
  saveArticles
};
