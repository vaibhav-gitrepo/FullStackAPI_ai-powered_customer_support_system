import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();

  // Create sample data
  const conversation = await prisma.conversation.create({
    data: {
      userId: 'user-1',
      messages: {
        create: [
          {
            sender: 'user',
            content: 'Hello, how can you help me?',
          },
          {
            sender: 'assistant',
            content: 'I can help you with various tasks. What do you need?',
          },
        ],
      },
    },
  });

  console.log('Seed data created:', conversation);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
