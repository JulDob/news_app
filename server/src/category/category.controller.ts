import { Request, Response, NextFunction } from 'express';
import { prisma } from '../common/db-client.connect';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    await prisma.category.create({ data: { title } });
    return res.status(201).json();
  } catch (err) {
    return next(err);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.category.findMany();
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
