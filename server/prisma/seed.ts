import { PrismaClient, Prisma } from '@prisma/client';
import { generatePassword } from '../src/common/utils';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: '11111111',
    role: 'admin',
    articles: {
      create: [
        {
          title: 'Title 3',
          url: '3',
          spoiler: 'Short description',
          content: 'Long description',
          coverImage: '',
          picture: '',
          category: {
            connect: {
              title: 'people',
            },
          },
          published: true,
        },
        {
          title: 'Title 4',
          url: '4',
          spoiler: 'Short description',
          content: 'Long description',
          coverImage: '',
          picture: '',
          category: {
            connect: {
              title: 'events',
            },
          },
          published: false,
        },
      ],
    },
  },
  {
    name: 'Manager',
    email: 'manager@manager.com',
    password: '11111111',
    role: 'manager',
    articles: {
      create: [
        {
          title: 'Title 1',
          url: '1',
          spoiler: 'Short description',
          content: 'Long description',
          coverImage: '',
          picture: '',
          category: {
            connect: {
              title: 'events',
            },
          },
          published: true,
        },
        {
          title: 'Title 2',
          url: '2',
          spoiler: 'Short description',
          content: 'Long description',
          coverImage: '',
          picture: '',
          category: {
            connect: {
              title: 'events',
            },
          },
          published: true,
        },
      ],
    },
  },
  {
    name: 'User',
    email: 'user@user.com',
    password: '11111111',
    role: 'user',
  },
];

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    title: 'people',
  },
  {
    title: 'events',
  },
  {
    title: 'parties',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    });
    console.log(`Created category with id: ${category.id}`);
  }

  for (const u of userData) {
    const hasedPassword = await generatePassword(u.password);
    const user = await prisma.user.create({
      data: { ...u, password: hasedPassword },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
