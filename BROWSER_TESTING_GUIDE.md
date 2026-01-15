# Browser Testing Guide

## Table of Contents
1. [Frontend Testing](#frontend-testing)
2. [API Testing in Browser](#api-testing-in-browser)
3. [Using Browser DevTools](#using-browser-devtools)
4. [Network Debugging](#network-debugging)
5. [Console Testing](#console-testing)
6. [Browser Extensions for API Testing](#browser-extensions-for-api-testing)
7. [Troubleshooting](#troubleshooting)

---

## Frontend Testing

### Step 1: Access Frontend in Address Bar

**Type in Browser Address Bar:**
```
http://localhost:5173
```

**Press Enter**

### Expected Result
```
✅ React application loads
✅ Page title shows "AI Support Frontend"
✅ Chat interface visible
✅ No red error messages
```

### What You Should See

**Left Panel** - Conversation List
```
Conversations
- No conversations yet (or existing ones)
```

**Center Panel** - Chat Area
```
[Chat Window]
[Message Input Box]
[Send Button]
```

**Right Panel** - Agent Info
```
Available Agents:
- Support
- Order  
- Billing
```

---

## API Testing in Browser

### Method 1: Direct URL (GET Requests Only)

#### Test 1: Health Check

**In Address Bar, Type:**
```
http://localhost:3000/api/health
```

**Press Enter**

**Expected Response in Browser:**
```json
{
  "status": "ok"
}
```

#### Test 2: Get Agents

**In Address Bar, Type:**
```
http://localhost:3000/api/agents
```

**Press Enter**

**Expected Response:**
```json
["support", "order", "billing"]
```

#### Test 3: Get Agent Capabilities

**In Address Bar, Type:**
```
http://localhost:3000/api/agents/support/capabilities
```

**Press Enter**

**Expected Response:**
```json
["FAQs", "Troubleshooting", "Conversation history"]
```

**Try Other Agents:**
```
http://localhost:3000/api/agents/order/capabilities
http://localhost:3000/api/agents/billing/capabilities
```

#### Test 4: Get Conversation History

**In Address Bar, Type:**
```
http://localhost:3000/api/chat/conversations/test-conv-1
```

**Press Enter**

**Expected Response:**
```json
[
  {
    "id": "msg-1",
    "conversationId": "test-conv-1",
    "sender": "user",
    "content": "Hello",
    "timestamp": "2026-01-15T10:30:00Z"
  }
]
```

---

## Using Browser DevTools

### Step 1: Open Developer Tools

**Windows/Linux:** Press `F12`  
**Mac:** Press `Cmd + Option + I`  
**Or:** Right-click → "Inspect"

### Step 2: Navigate to Different Tabs

#### Console Tab (F12 → Console)
For running JavaScript and testing APIs

#### Network Tab (F12 → Network)
For monitoring API requests and responses

#### Elements Tab (F12 → Elements)
For inspecting HTML and CSS

#### Application Tab (F12 → Application)
For viewing stored data and cookies

---

## Console Testing

### Step 1: Open Console
Press `F12`, click **Console** tab

### Step 2: Test Backend Connection

**Copy and Paste This:**
```javascript
fetch('http://localhost:3000/api/health')
  .then(response => response.json())
  .then(data => console.log('✅ Backend Response:', data))
  .catch(error => console.error('❌ Error:', error));
```

**Expected Console Output:**
```
✅ Backend Response: {status: 'ok'}
```

---

### Test 3: Get Agents List

**Copy and Paste:**
```javascript
fetch('http://localhost:3000/api/agents')
  .then(response => response.json())
  .then(data => console.log('✅ Available Agents:', data))
  .catch(error => console.error('❌ Error:', error));
```

**Expected Output:**
```
✅ Available Agents: (3) ['support', 'order', 'billing']
```

---

### Test 4: Get Agent Capabilities

**Copy and Paste:**
```javascript
fetch('http://localhost:3000/api/agents/support/capabilities')
  .then(response => response.json())
  .then(data => console.log('✅ Support Agent Can Do:', data))
  .catch(error => console.error('❌ Error:', error));
```

**Expected Output:**
```
✅ Support Agent Can Do: (3) ['FAQs', 'Troubleshooting', 'Conversation history']
```

---

### Test 5: Send a Message (POST Request)

**Copy and Paste:**
```javascript
fetch('http://localhost:3000/api/chat/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    conversationId: 'test-conv-001',
    message: 'Hello, can you help me?'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Agent Response:', data);
    console.log('📝 Agent said:', data.content);
  })
  .catch(error => console.error('❌ Error:', error));
```

**Expected Output:**
```
✅ Agent Response: {
  content: "I can help you with...",
  conversationId: "test-conv-001"
}
📝 Agent said: I can help you with...
```

---

### Test 6: Get Conversation History

**Copy and Paste:**
```javascript
fetch('http://localhost:3000/api/chat/conversations/test-conv-001')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Conversation History:', data);
    console.table(data); // Display as table
  })
  .catch(error => console.error('❌ Error:', error));
```

**Expected Output:**
```
✅ Conversation History: Array(2)
0: {id: "msg-1", sender: "user", content: "Hello, can you help me?", ...}
1: {id: "msg-2", sender: "agent", content: "I can help you with...", ...}
```

---

## Network Debugging

### Step 1: Open Network Tab
Press `F12`, click **Network** tab

### Step 2: Send Message from Frontend

1. Keep Network tab open
2. Type message in chat interface
3. Click Send button

### Step 3: Monitor Network Requests

You should see:
```
POST /api/chat/messages
  Status: 200 or 201
  Size: ~1 KB
  Time: < 1000ms
```

### Step 4: View Request/Response

**Click on the request** to see:

**Headers Tab:**
```
POST /api/chat/messages HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

**Payload Tab:**
```json
{
  "conversationId": "conv-123",
  "message": "Hello"
}
```

**Response Tab:**
```json
{
  "content": "I can help you with...",
  "conversationId": "conv-123"
}
```

---

## Complete Console Testing Script

### Copy All Tests at Once

Press `F12`, go to **Console**, and paste this entire script:

```javascript
// ========== FULL TESTING SUITE ==========

console.log('🚀 Starting Application Tests...\n');

// Test 1: Health Check
console.log('1️⃣  Testing Backend Health Check...');
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log('✅ Backend Healthy:', data))
  .catch(err => console.error('❌ Health Check Failed:', err));

// Test 2: Get Agents
setTimeout(() => {
  console.log('\n2️⃣  Testing Get Agents...');
  fetch('http://localhost:3000/api/agents')
    .then(res => res.json())
    .then(data => console.log('✅ Available Agents:', data))
    .catch(err => console.error('❌ Get Agents Failed:', err));
}, 500);

// Test 3: Get Support Capabilities
setTimeout(() => {
  console.log('\n3️⃣  Testing Support Agent Capabilities...');
  fetch('http://localhost:3000/api/agents/support/capabilities')
    .then(res => res.json())
    .then(data => console.log('✅ Support Can Do:', data))
    .catch(err => console.error('❌ Failed:', err));
}, 1000);

// Test 4: Send Message
setTimeout(() => {
  console.log('\n4️⃣  Testing Send Message...');
  fetch('http://localhost:3000/api/chat/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversationId: 'test-' + Date.now(),
      message: 'Test message from browser console'
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log('✅ Agent Response:', data.content);
      console.log('   Conversation ID:', data.conversationId);
    })
    .catch(err => console.error('❌ Send Message Failed:', err));
}, 1500);

// Test 5: Get Conversation
setTimeout(() => {
  const testConvId = 'test-' + Date.now();
  console.log('\n5️⃣  Testing Get Conversation History...');
  fetch(`http://localhost:3000/api/chat/conversations/${testConvId}`)
    .then(res => res.json())
    .then(data => {
      console.log('✅ Conversation History:');
      console.table(data);
    })
    .catch(err => console.error('❌ Get Conversation Failed:', err));
}, 2000);

console.log('\n⏳ Tests running... Check above for results in 2-3 seconds');
```

---

## Browser Extensions for API Testing

### Option 1: Postman (Recommended)
- Download: https://www.postman.com/downloads/
- Browser Extension: https://chrome.google.com/webstore/detail/postman/
- Works for complex API testing with POST, PUT, DELETE

### Option 2: Thunder Client (VS Code)
- Install in VS Code: `Thunder Client` extension
- Easy-to-use API testing

### Option 3: REST Client (VS Code)
- Install: `REST Client` extension
- Create `.rest` files for API testing

### Option 4: Browser Built-in - Fetch API
- Use Console tab (shown above)
- No installation needed

---

## Testing Checklist

| # | Test | URL/Action | Expected | Pass |
|---|------|-----------|----------|------|
| 1 | Frontend Loads | http://localhost:5173 | React app displays | ☐ |
| 2 | Backend Health | http://localhost:3000/api/health | {"status":"ok"} | ☐ |
| 3 | Get Agents | http://localhost:3000/api/agents | ["support", "order", "billing"] | ☐ |
| 4 | Support Capabilities | http://localhost:3000/api/agents/support/capabilities | Array of capabilities | ☐ |
| 5 | Order Capabilities | http://localhost:3000/api/agents/order/capabilities | Array of capabilities | ☐ |
| 6 | Billing Capabilities | http://localhost:3000/api/agents/billing/capabilities | Array of capabilities | ☐ |
| 7 | Send Message (Console) | paste Test 5 code | Agent responds | ☐ |
| 8 | Get Conversation (Console) | paste Test 6 code | Messages array | ☐ |
| 9 | Network Monitoring | Send message, check Network tab | POST shows in Network | ☐ |
| 10 | Frontend Chat | Type message in chat UI | Message displays | ☐ |

---

## Real Browser Testing Scenarios

### Scenario 1: Quick Backend Verification

```
1. Open http://localhost:3000/api/health
   ✅ See: {"status":"ok"}
   
2. Open http://localhost:3000/api/agents
   ✅ See: ["support", "order", "billing"]
```

**Time**: 10 seconds
**Confirms**: Backend is running and database connected

---

### Scenario 2: Full Feature Test

```
1. Open http://localhost:5173
   ✅ Frontend loads

2. Press F12, go to Console

3. Paste full testing script above
   ✅ All 5 tests pass

4. Go to Network tab, send message from chat
   ✅ See POST request to /api/chat/messages
```

**Time**: 1 minute
**Confirms**: Full system working end-to-end

---

### Scenario 3: Individual Agent Testing

```
Test Support Agent:
http://localhost:3000/api/agents/support/capabilities

Test Order Agent:
http://localhost:3000/api/agents/order/capabilities

Test Billing Agent:
http://localhost:3000/api/agents/billing/capabilities

✅ All return capabilities lists
```

**Time**: 30 seconds
**Confirms**: All agents operational

---

## Troubleshooting

### Issue: "Cannot GET /api/..." error

**Cause**: Backend not running

**Fix**:
```bash
cd C:\FullStackAPI_ai\backend
npm run dev
```

**Verify**:
```
http://localhost:3000/api/health
# Should return: {"status":"ok"}
```

---

### Issue: CORS Error in Console

```
Access to fetch at 'http://localhost:3000/api/...' 
from origin 'http://localhost:5173' has been blocked
```

**Cause**: Backend CORS not configured

**Fix**: Check [backend/src/index.ts](backend/src/index.ts) has error handler with CORS

---

### Issue: Blank Page or 404

**Cause**: Frontend not running or wrong port

**Fix**:
```bash
cd C:\FullStackAPI_ai\Frontend
npm run dev
```

**Verify**:
```
http://localhost:5173
# Should show React app
```

---

### Issue: Console Shows "TypeError: fetch failed"

**Cause**: Backend not responding or network issue

**Solution**:
```javascript
// Check in console:
fetch('http://localhost:3000/api/health')
  .then(res => {
    console.log('Status:', res.status); // Should be 200
    return res.json();
  })
  .then(data => console.log('Data:', data))
  .catch(err => {
    console.error('Error details:', err.message);
    console.log('Backend running on port 3000? Try: npm run dev');
  });
```

---

## Performance Testing in Browser

### Check Response Time

**In Console:**
```javascript
console.time('API Response');

fetch('http://localhost:3000/api/chat/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversationId: 'perf-test',
    message: 'Performance test'
  })
})
  .then(res => res.json())
  .then(data => {
    console.timeEnd('API Response');
    console.log('Response received:', data);
  });
```

**Expected Output:**
```
API Response: 145ms  ✅ (should be < 1000ms)
Response received: {...}
```

---

## Browser DevTools Tips

### Tip 1: Filter Network Requests
- In Network tab, type `localhost:3000` in filter box
- Shows only API requests

### Tip 2: View JSON Responses Nicely
- Response tab automatically formats JSON
- Click on values to expand

### Tip 3: Repeat Request
- Right-click on request in Network tab
- Click "Repeat Request"
- Useful for testing without frontend

### Tip 4: Copy as cURL
- Right-click on request
- Select "Copy" → "Copy as cURL"
- Use in terminal for debugging

---

## Quick Reference Sheet

| Task | URL/Action |
|------|-----------|
| Open Frontend | `http://localhost:5173` |
| Health Check | `http://localhost:3000/api/health` |
| List Agents | `http://localhost:3000/api/agents` |
| Agent Capabilities | `http://localhost:3000/api/agents/support/capabilities` |
| Send Message (Console) | See Test 5 code above |
| Get Conversation (Console) | See Test 6 code above |
| Open DevTools | Press `F12` |
| Open Console | `F12` → Console tab |
| Open Network | `F12` → Network tab |

---

**Last Updated**: January 15, 2026
**Version**: 1.0.0
