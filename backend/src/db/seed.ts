import { prisma } from './prisma';

async function main() {
  await prisma.order.create({
    data: { userId: 'user1', status: 'shipped', deliveryDate: new Date() }
  });
  await prisma.payment.create({
    data: { userId: 'user1', amount: 99.99, status: 'completed', invoiceId: 'INV123' }
  });
  await prisma.conversation.create({
    data: { userId: 'user1', messages: { create: { sender: 'user', content: 'Hello!' } } }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
