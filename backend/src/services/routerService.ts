import { supportService } from './supportService';
import { orderService } from './orderService';
import { billingService } from './billingService';

export const routerService = {
  async handleMessage(conversationId: string, message: string) {
    // Simple intent classification (replace with AI model)
    if (message.includes('order')) {
      return orderService.handle(conversationId, message);
    } else if (message.includes('refund') || message.includes('invoice')) {
      return billingService.handle(conversationId, message);
    } else {
      return supportService.handle(conversationId, message);
    }
  }
};
