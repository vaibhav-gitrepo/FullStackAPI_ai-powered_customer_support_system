import { prisma } from '../db/prisma';

export const billingService = {
  async handle(conversationId: string, message: string) {
    const payment = await prisma.payment.findFirst();
    return { content: `Billing Agent: Your last payment of $${payment?.amount} is ${payment?.status}.` };
  }
};
