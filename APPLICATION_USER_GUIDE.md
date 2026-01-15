# Application User Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Starting the Application](#starting-the-application)
3. [Accessing the Application](#accessing-the-application)
4. [Frontend Features](#frontend-features)
5. [Backend API Usage](#backend-api-usage)
6. [Chat Workflow](#chat-workflow)
7. [Testing the Application](#testing-the-application)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Ensure Both Servers Are Running

**Terminal 1 - Backend Server**
```bash
cd C:\FullStackAPI_ai\backend
npm run dev
```
Expected Output:
```
Server running on http://localhost:3000
```

**Terminal 2 - Frontend Server**
```bash
cd C:\FullStackAPI_ai\Frontend
npm run dev
```
Expected Output:
```
VITE v5.4.21  ready in 1603 ms
➜  Local:   http://localhost:5173/
```

**Verify Both Servers Are Running**
```bash
# Backend health check
curl http://localhost:3000/api/health

# Should return: {"status":"ok"}
```

---

## Accessing the Application

### Open Frontend in Browser

Navigate to:
```
http://localhost:5173
```

**What You Should See:**
- React application loads
- Chat interface visible
- Agent list displayed
- No console errors

### Backend API Documentation

Backend API is accessible at:
```
http://localhost:3000
```

Available endpoints:
- `GET http://localhost:3000/api/health` - Server health
- `GET http://localhost:3000/api/agents` - List agents
- `GET http://localhost:3000/api/agents/:type/capabilities` - Agent capabilities
- `POST http://localhost:3000/api/chat/messages` - Send message
- `GET http://localhost:3000/api/chat/conversations/:id` - Get messages

---

## Frontend Features

### Main Components

#### 1. **Chat Window**
- Central component for user interaction
- Displays conversation history
- Input field for new messages
- Real-time message display

#### 2. **Conversation List**
- Left sidebar showing all conversations
- Click to switch between conversations
- Shows conversation ID and date created

#### 3. **Agent Info**
- Displays available AI agents
- Shows agent capabilities
- Allows agent selection

---

## Backend API Usage

### 1. Health Check Endpoint

**Check if backend is running:**
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok"
}
```

**When to Use**: Verify server is responsive before making other requests

---

### 2. Get Available Agents

**List all AI agents:**
```bash
curl http://localhost:3000/api/agents
```

**Response:**
```json
["support", "order", "billing"]
```

**Agents Available:**
- **support**: Customer support queries
- **order**: Order tracking and management
- **billing**: Billing and invoice inquiries

---

### 3. Get Agent Capabilities

**View what a specific agent can do:**

```bash
# Support Agent Capabilities
curl http://localhost:3000/api/agents/support/capabilities
```

**Response:**
```json
["FAQs", "Troubleshooting", "Conversation history"]
```

**Other Agents:**
```bash
curl http://localhost:3000/api/agents/order/capabilities
# Response: ["Order status", "Tracking", "Cancellation"]

curl http://localhost:3000/api/agents/billing/capabilities
# Response: ["Invoices", "Refunds", "Payments"]
```

---

### 4. Send Message to Agent

**Start a conversation:**

```bash
curl -X POST http://localhost:3000/api/chat/messages \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "conv-001",
    "message": "Hello, I need help with my order"
  }'
```

**Request Parameters:**
- `conversationId` (string): Unique conversation identifier
- `message` (string): User message content

**Response:**
```json
{
  "content": "I can help you with order tracking and status updates. What would you like to know about your order?",
  "conversationId": "conv-001"
}
```

**What Happens:**
1. Message saved to database under your conversation
2. Agent processes the message
3. Response generated and saved
4. Response returned to frontend

---

### 5. Get Conversation History

**Retrieve all messages in a conversation:**

```bash
curl http://localhost:3000/api/chat/conversations/conv-001
```

**Response:**
```json
[
  {
    "id": "msg-1",
    "conversationId": "conv-001",
    "sender": "user",
    "content": "Hello, I need help with my order",
    "timestamp": "2026-01-15T10:30:00Z"
  },
  {
    "id": "msg-2",
    "conversationId": "conv-001",
    "sender": "agent",
    "content": "I can help you with order tracking and status updates...",
    "timestamp": "2026-01-15T10:30:05Z"
  }
]
```

---

## Chat Workflow

### Step-by-Step User Interaction

#### Step 1: Open Frontend
```
Visit: http://localhost:5173
```

#### Step 2: View Available Agents
- Look at Agent Info panel
- See three agents: Support, Order, Billing
- Read their capabilities

#### Step 3: Start New Conversation
```javascript
// Generate unique conversation ID (frontend should do this)
const conversationId = `conv-${Date.now()}`;
```

#### Step 4: Send First Message
```javascript
// Frontend sends to backend
POST /api/chat/messages
{
  "conversationId": "conv-1705330200000",
  "message": "Can you help me track my order?"
}
```

#### Step 5: Receive Response
```javascript
// Backend returns
{
  "content": "Sure! I can help you track your order. Please provide your order ID.",
  "conversationId": "conv-1705330200000"
}
```

#### Step 6: Continue Conversation
```javascript
// Send follow-up message
POST /api/chat/messages
{
  "conversationId": "conv-1705330200000",
  "message": "My order ID is ORD-12345"
}
```

#### Step 7: View Conversation History
```bash
GET /api/chat/conversations/conv-1705330200000
```
Returns all messages in chronological order

---

## Complete Usage Scenario

### Scenario: Customer Support Interaction

**User Goal**: Track an order and resolve a billing issue

### Conversation Flow

```
┌──────────────────────────────────────────┐
│ User Opens http://localhost:5173         │
└──────────────────────┬───────────────────┘
                       ↓
┌──────────────────────────────────────────┐
│ Frontend displays:                       │
│ - Chat interface (empty)                 │
│ - Agent list: support, order, billing    │
│ - Input field for message                │
└──────────────────────┬───────────────────┘
                       ↓
┌──────────────────────────────────────────┐
│ User Types: "Hi, can you help me?"       │
│ Clicks Send                              │
└──────────────────────┬───────────────────┘
                       ↓
┌──────────────────────────────────────────┐
│ Frontend sends POST request to:          │
│ POST /api/chat/messages                  │
│ {                                        │
│   "conversationId": "conv-12345",        │
│   "message": "Hi, can you help me?"      │
│ }                                        │
└──────────────────────┬───────────────────┘
                       ↓
┌──────────────────────────────────────────┐
│ Backend:                                 │
│ 1. Saves user message to database        │
│ 2. Routes to appropriate agent           │
│ 3. Generates response                    │
│ 4. Saves response to database            │
│ 5. Returns response to frontend          │
└──────────────────────┬───────────────────┘
                       ↓
┌──────────────────────────────────────────┐
│ Frontend displays agent response:        │
│ "Hello! I'm your support agent. How     │
│  can I assist you today?"                │
└──────────────────────┬───────────────────┘
                       ↓
┌──────────────────────────────────────────┐
│ User continues conversation...           │
│ Conversation history builds up           │
└──────────────────────────────────────────┘
```

---

## Testing the Application

### Test 1: Frontend Loads

**Action**: Visit `http://localhost:5173`

**Expected Result**:
```
✅ React app loads without errors
✅ Chat interface visible
✅ Agent list displayed
✅ No red error messages in console (F12)
```

---

### Test 2: Backend is Responsive

**Action**:
```bash
curl http://localhost:3000/api/health
```

**Expected Result**:
```
✅ HTTP 200 response
✅ Body: {"status":"ok"}
✅ Response time < 100ms
```

---

### Test 3: Get Agents List

**Action**:
```bash
curl http://localhost:3000/api/agents
```

**Expected Result**:
```
✅ HTTP 200 response
✅ Body: ["support", "order", "billing"]
```

---

### Test 4: Send a Message

**Action**:
```bash
curl -X POST http://localhost:3000/api/chat/messages \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "test-conv-1",
    "message": "Test message"
  }'
```

**Expected Result**:
```
✅ HTTP 200 or 201 response
✅ Response includes agent message
✅ conversationId matches request
```

---

### Test 5: Frontend-Backend Communication

**In Browser DevTools Console** (Press F12 → Console):

```javascript
// Test 1: Health check
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log('✅ Backend working:', data))
  .catch(err => console.error('❌ Error:', err));

// Test 2: Get agents
fetch('http://localhost:3000/api/agents')
  .then(res => res.json())
  .then(data => console.log('✅ Agents:', data))
  .catch(err => console.error('❌ Error:', err));

// Test 3: Send message
fetch('http://localhost:3000/api/chat/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversationId: 'test-123',
    message: 'Hello from browser console'
  })
})
  .then(res => res.json())
  .then(data => console.log('✅ Response:', data))
  .catch(err => console.error('❌ Error:', err));
```

**Expected Console Output**:
```
✅ Backend working: {status: 'ok'}
✅ Agents: (3) ['support', 'order', 'billing']
✅ Response: {content: '...', conversationId: 'test-123'}
```

---

### Test 6: Database Persistence

**Action**:
```bash
# View database with Prisma Studio
npx prisma studio
```

**Expected Result**:
```
✅ Opens http://localhost:5555
✅ Shows Conversation table with entries
✅ Shows Message table with chat history
✅ Data matches what you sent via API
```

---

## Complete Testing Checklist

| # | Test | Action | Expected | Status |
|---|------|--------|----------|--------|
| 1 | Frontend Loads | Visit http://localhost:5173 | React app visible | ☐ |
| 2 | Backend Health | curl /api/health | HTTP 200 + {"status":"ok"} | ☐ |
| 3 | Get Agents | curl /api/agents | HTTP 200 + 3 agents | ☐ |
| 4 | Agent Capabilities | curl /api/agents/support/capabilities | HTTP 200 + capabilities | ☐ |
| 5 | Send Message | POST /api/chat/messages | HTTP 200/201 + response | ☐ |
| 6 | Get Conversation | GET /api/chat/conversations/:id | HTTP 200 + messages array | ☐ |
| 7 | Frontend Console | Browser console tests | All 3 tests pass | ☐ |
| 8 | Database | npx prisma studio | Tables show data | ☐ |

---

## Real-World Usage Examples

### Example 1: Customer Service Chat

```javascript
// User initiates chat
const userId = "user-123";
const conversationId = "conv-support-001";

// Send support question
fetch('http://localhost:3000/api/chat/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversationId: conversationId,
    message: "How do I reset my password?"
  })
})
  .then(res => res.json())
  .then(data => {
    // Display agent response to user
    console.log('Agent:', data.content);
  });
```

### Example 2: Order Tracking

```javascript
// Customer wants to track order
fetch('http://localhost:3000/api/chat/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversationId: "conv-order-002",
    message: "Where is my order ORD-98765?"
  })
})
  .then(res => res.json())
  .then(data => {
    // Display order status to user
    console.log('Order Status:', data.content);
  });
```

### Example 3: Billing Inquiry

```javascript
// Customer asks about invoice
fetch('http://localhost:3000/api/chat/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversationId: "conv-billing-003",
    message: "Can I get a copy of my invoice INV-2026-001?"
  })
})
  .then(res => res.json())
  .then(data => {
    // Display billing info
    console.log('Invoice:', data.content);
  });
```

---

## Troubleshooting

### Issue: Frontend Won't Load
```
Error: Connection refused at localhost:5173
```

**Solution:**
```bash
# Restart frontend server
cd C:\FullStackAPI_ai\Frontend
npm run dev

# Verify Vite starts
# Output should show: ➜  Local:   http://localhost:5173/
```

---

### Issue: Backend Not Responding
```
Error: Connection refused at localhost:3000
```

**Solution:**
```bash
# Restart backend server
cd C:\FullStackAPI_ai\backend
npm run dev

# Verify server starts
# Output should show: Server running on http://localhost:3000
```

---

### Issue: API Calls Return Errors
```javascript
// Error: Failed to fetch
// or
// Error: CORS error
```

**Solution:**
```javascript
// Check backend is running
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend OK:', data))
  .catch(err => {
    console.error('Backend not responding:', err);
    // Restart backend server
  });
```

---

### Issue: No Conversation History

**Check Database:**
```bash
npx prisma studio
# Navigate to Conversation and Message tables
# Verify data is being saved
```

**If Empty:**
```bash
# Seed database with sample data
npx prisma db seed

# Then try sending messages again
```

---

### Issue: Can't Send Messages

**Check Backend Logs:**
```bash
# Look at terminal running backend
# Look for error messages

# Common errors:
# - Database connection failed
# - Missing environment variables
# - Port already in use
```

**Solution:**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Restart backend
npm run dev
```

---

## Performance Tips

### Frontend Optimization
- Messages load incrementally
- Use browser DevTools to monitor network requests
- Check Performance tab in DevTools for slow operations

### Backend Optimization
- Each message saved to database
- Responses should be < 1 second
- Monitor API response times in browser Network tab

### Database Optimization
- Old conversations can be archived
- Regular backups recommended
- Monitor connection pool

---

## Next Steps

### 1. **Customize Agent Responses**
Modify [backend/src/services/routerService.ts](backend/src/services/routerService.ts)

### 2. **Add New Features**
- User authentication
- Conversation export
- Analytics dashboard
- Multi-language support

### 3. **Deploy to Production**
- Set up hosting (Vercel, Heroku, AWS)
- Configure production database
- Set up CI/CD pipeline
- Enable HTTPS

---

## Support

For issues or questions:
1. Check [README.md](README.md) for general info
2. Check [GIT_PUSH_TROUBLESHOOTING.md](GIT_PUSH_TROUBLESHOOTING.md) for git issues
3. Check [GIT_GITHUB_SETUP.md](GIT_GITHUB_SETUP.md) for setup help
4. Review backend server logs
5. Check browser console (F12) for errors

---

**Last Updated**: January 15, 2026
**Version**: 1.0.0
