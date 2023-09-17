import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connetDB = async () => {
  try {
    await prisma.$connect();
    console.log('You successfully connected db');
  } catch (err) {
    if (err instanceof Error) {
      console.log("You can't connect db: ", err.message);
    }
  }
};

export const disconnetDB = async () => {
  await prisma.$disconnect();
};
