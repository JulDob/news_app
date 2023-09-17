import express from 'express';
import auth from '../middlewares/auth';
import * as controller from './category.controller';

export const categoryRoutes = express.Router();

categoryRoutes.post('/', auth(['admin', 'manager']), controller.create);

categoryRoutes.get('/', controller.getCategories);
