const articleRouter = require('express').Router();
const {
    createArticle, fetchArticle, fetchArticles, deleteArticle, deleteArticles
} = require('../controllers/article.controller');
const verifyAuth = require('../middleware/auth.middleware');

articleRouter.post('/create', verifyAuth, createArticle);
articleRouter.get('/:id', fetchArticle);
articleRouter.get('/all', fetchArticles);
articleRouter.post('/delete/:id', deleteArticle);
articleRouter.post('/delete/all', verifyAuth, deleteArticles);

module.exports = { articleRouter };