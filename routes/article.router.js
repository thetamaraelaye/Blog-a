const articleRouter = require('express').Router();
const {
    createArticle, fetchArticle, fetchArticles, deleteArticle
} = require('../controllers/article.controller');
const verifyAuth = require('../middlewares/auth.middleware');

articleRouter.post('/create', verifyAuth, createArticle);
articleRouter.get('/fetch/:id', fetchArticle); //
articleRouter.get('/all', fetchArticles);
articleRouter.post('/delete/:id', verifyAuth, deleteArticle);

module.exports = articleRouter;