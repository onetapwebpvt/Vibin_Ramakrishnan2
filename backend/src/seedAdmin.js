import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL,
      encryptedPassword: hashedPassword,
      role: 'admin'
    }
  });

  console.log('✅ Admin user created successfully!');
  console.log(`Email: ${process.env.ADMIN_EMAIL}`);
  console.log(`Password: ${process.env.ADMIN_PASSWORD}`);
}

seedAdmin()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
