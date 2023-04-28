const articleRouter = require('express').Router();
const {
    createArticle, fetchArticle, fetchArticles, deleteArticle, deleteArticles
} = require('../controllers/article.controller');
const verifyAuth = require('../middleware/auth.middleware');

articleRouter.post('/create', verifyAuth, createArticle);
articleRouter.get('post/:id', fetchArticle); //
articleRouter.get('/all', fetchArticles);
articleRouter.post('/delete/:id', verifyAuth, deleteArticle);

module.exports = { articleRouter };