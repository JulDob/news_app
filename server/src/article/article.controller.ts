import { Request, Response, NextFunction } from 'express';
import Exception from '../common/Exception';
import { getParcedLimit } from '../utils/utils';
import { prisma } from '../common/db-client.connect';

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  const limit = getParcedLimit(Number(req.query.limit), 4, 10);
  const offset = Number(req.query.skip) || 0;
  try {
    const query = {
      where: {
        published: true,
      },
    };

    const data = await prisma.article.findMany({
      include: { category: true },
      skip: offset,
      take: limit,
      orderBy: {
        id: 'desc',
      },
      ...query,
    });

    const count = await prisma.article.count(query);
    return res.status(200).json({
      data,
      limit,
      offset,
      count,
    });
  } catch (err) {
    return next(err);
  }
};

export const getLastArticles = async (req: Request, res: Response, next: NextFunction) => {
  const limit = getParcedLimit(Number(req.query.limit), 4, 10);

  try {
    const data = await prisma.article.findMany({
      include: { category: true },
      take: limit,
      orderBy: {
        id: 'desc',
      },
      where: {
        published: true,
      },
    });
    return res.status(200).json({
      data,
      limit,
    });
  } catch (err) {
    return next(err);
  }
};

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  try {
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article || !article.published) {
      return next(new Exception(404, 'Article not found'));
    }

    return res.status(200).json(article);
  } catch (err) {
    return next(err);
  }
};

export const getArticlesByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
  const limit = getParcedLimit(Number(req.query.limit), 4, 10);
  const offset = Number(req.query.skip) || 0;
  const categoryId = Number(req.params.categoryId);
  try {
    const query = {
      where: {
        categoryId,
      },
    };

    const data = await prisma.article.findMany({
      include: { category: true },
      skip: offset,
      take: limit,
      orderBy: {
        id: 'desc',
      },
      ...query,
    });

    const count = await prisma.article.count(query);

    return res.status(200).json({
      data,
      limit,
      offset,
      count,
    });
  } catch (err) {
    return next(err);
  }
};

export const publishArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return next(new Exception(404, 'Article not found'));
    }

    await prisma.article.update({ where: { id }, data: { published: true } });

    return res.status(200).json();
  } catch (e) {
    return next(e);
  }
};

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.article.create({ data: { ...req.body, published: false } });
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
};
