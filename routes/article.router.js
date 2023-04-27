const articleRouter = require('express').Router();
const {
    createArticle 
} = require('../controllers/article.controller');
const verifyAuth = require('../middleware/auth.middleware');

articleRouter.post('/create', verifyAuth, createArticle);
articleRouter.get('/:id');
articleRouter.get('/all');
articleRouter.post('/delete/:id')

module.exports = { articleRouter };