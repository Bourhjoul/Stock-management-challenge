import { users } from './users';
import { PrismaClient } from '.prisma/client';
import * as bcrypt from 'bcrypt';

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

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
