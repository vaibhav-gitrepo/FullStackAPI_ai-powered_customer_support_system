import { prisma } from '../db/prisma';

export const orderService = {
  async handle(conversationId: string, message: string) {
    const order = await prisma.order.findFirst();
    return { content: `Order Agent: Your order ${order?.id} is ${order?.status}.` };
  }
};
