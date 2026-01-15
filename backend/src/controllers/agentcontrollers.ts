import { Hono } from 'hono';

export const agentController = new Hono();

agentController.get('/', (c) => {
  return c.json(['support', 'order', 'billing']);
});

agentController.get('/:type/capabilities', (c) => {
  const type = c.req.param('type');
  const capabilities: Record<string, string[]> = {
    support: ['FAQs', 'Troubleshooting', 'Conversation history'],
    order: ['Order status', 'Tracking', 'Cancellation'],
    billing: ['Invoices', 'Refunds', 'Payments']
  };
  return c.json(capabilities[type] || []);
});
