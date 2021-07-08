import { users } from './users';
import { PrismaClient } from '.prisma/client';
import * as bcrypt from 'bcrypt';
import { products } from './products';

const prisma = new PrismaClient();
const hashingpassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

async function main() {
  users[0].password = await hashingpassword('abdo1234');
  users[1].password = await hashingpassword('admin1234');

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

async function seedproducts() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

async function seedcustomersandorder() {
  await prisma.customer.create({
    data: {
      name: 'Elmehdi',
    },
  });
}

seedcustomersandorder()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
