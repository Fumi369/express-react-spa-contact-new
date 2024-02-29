import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const taro = await prisma.contact.upsert({
    where: { email: "taro@example.com" },
    update: {},
    create: {
      email: "taro@example.com",
      name: "taro",
    },
  });

  const jiro = await prisma.contact.upsert({
    where: { email: "jiro@example.com" },
    update: {},
    create: {
      email: "jiro@example.com",
      name: "jiro",
    },
  });
  console.log({ taro, jiro });

  {
    // createMany is not supported on SQLite
    for (let i = 0; i < 100; i++) {
      await prisma.contact.create({
        data: { name: `user${i}`, email: `email${i}@example.com` },
      });
    }
  }

  const personal = await prisma.category.upsert({
    where: { name: "personal" },
    update: {},
    create: {
      name: "personal",
    },
  });

  const business = await prisma.category.upsert({
    where: { name: "business" },
    update: {},
    create: {
      name: "business",
    },
  });
  console.log({ personal, business });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
