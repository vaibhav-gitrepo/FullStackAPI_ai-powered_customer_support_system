import { Hono } from 'hono';
import { routerService } from '../services/routerService';
import { prisma } from '../db/prisma';

export const chatController = new Hono();

chatController.post('/messages', async (c) => {
  const { conversationId, message } = await c.req.json();

  // Save user message
  await prisma.message.create({
    data: { conversationId, sender: 'user', content: message }
  });

  const response = await routerService.handleMessage(conversationId, message);

  // Save agent response
  await prisma.message.create({
    data: { conversationId, sender: 'agent', content: response.content }
  });

  return c.json(response);
});

chatController.get('/conversations/:id', async (c) => {
  const id = c.req.param('id');
  const messages = await prisma.message.findMany({ where: { conversationId: id } });
  return c.json(messages);
});

chatController.get('/conversations', async (c) => {
  const conversations = await prisma.conversation.findMany();
  return c.json(conversations);
});

chatController.delete('/conversations/:id', async (c) => {
  const id = c.req.param('id');
  await prisma.conversation.delete({ where: { id } });
  return c.json({ success: true });
});
