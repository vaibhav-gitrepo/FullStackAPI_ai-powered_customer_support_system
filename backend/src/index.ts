import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { chatController } from './controllers/chatControllers';
import { agentController } from './controllers/agentcontrollers';
import { healthController } from './controllers/healthcontrollers';
import { errorHandler } from './middleware/errorHandler';

const app = new Hono();

app.use('*', errorHandler);

app.route('/api/chat', chatController);
app.route('/api/agents', agentController);
app.route('/api/health', healthController);

const port = 3000;
console.log(`Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
