import express from 'express';
import auth from '../middlewares/auth';
import * as controller from './article.controller';

const articleRoutes = express.Router();

articleRoutes.get('/', controller.getArticles);

articleRoutes.post(
  '/',
  auth(['admin', 'manager']),
  /*[uploadImage.single('picture'), uploadBigImage.single('coverImage')]*/
  controller.createArticle,
);

articleRoutes.get('/last-articles', controller.getLastArticles);

articleRoutes.get('/:id', controller.getArticleById);

articleRoutes.get('/category/:categoryId', controller.getArticlesByCategoryId);

articleRoutes.get('/publish/:id', auth(['admin']), controller.publishArticle);

export default articleRoutes;
