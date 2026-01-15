# Full Stack AI Support Application

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Project Architecture](#project-architecture)
4. [Technology Stack](#technology-stack)
5. [Installation & Setup](#installation--setup)
6. [Development](#development)
7. [Testing Procedures](#testing-procedures)
8. [API Endpoints](#api-endpoints)
9. [Database Schema](#database-schema)
10. [Project Structure](#project-structure)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Full Stack AI Support Application** is a comprehensive web application designed to provide AI-powered customer support through multiple specialized agents. The application consists of a React-based frontend, a Hono.js backend, and a PostgreSQL database, enabling real-time chat conversations, agent management, and customer support workflows.

### Key Features
- Real-time chat interface with multiple conversation support
- AI agent management (Support, Order, Billing agents)
- Message persistence and conversation history
- Health monitoring and system status endpoints
- RESTful API architecture
- Type-safe operations with TypeScript and Prisma ORM

---

## System Requirements

### Hardware Specifications
- **Processor**: Intel i5 or equivalent (2+ cores)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 2GB free disk space
- **Network**: Active internet connection for cloud database access

### Software Requirements
- **Operating System**: Windows 10/11, macOS, or Linux
- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher
- **PostgreSQL**: v12+ (or use cloud provider like Supabase)
- **Git**: v2.25.0 or higher

### Environment Variables
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
NODE_ENV=development
```

---

## Project Architecture

### System Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                       │
│              React + TypeScript + Vite                  │
│          (Port: 5173 - Development Server)              │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  ChatPage    │  │ AgentsPage   │  │ChatWindow    │  │
│  │              │  │              │  │ConversationL │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                      │ HTTP Requests
                      ↓
┌─────────────────────────────────────────────────────────┐
│                    Backend Layer                        │
│            Hono.js + TypeScript + Node.js               │
│          (Port: 3000 - Development Server)              │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         API Routes (@hono/node-server)           │  │
│  │  ┌────────────────┬────────────┬──────────────┐  │  │
│  │  │  /api/chat     │ /api/agents│ /api/health  │  │  │
│  │  └────────────────┴────────────┴──────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                      │                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │     Services & Business Logic                    │  │
│  │  ┌─────────────┬────────────┬──────────────────┐ │  │
│  │  │RouterService│OrderService│BillingService   │ │  │
│  │  └─────────────┴────────────┴──────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                      │ Prisma ORM
│                      ↓
└─────────────────────────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────┐
│              Database Layer (PostgreSQL)                │
│    Supabase Cloud Database (Cloud Hosted)               │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Conversation  │  │    Message   │  │    Order     │  │
│  │  - id        │  │  - id        │  │  - id        │  │
│  │  - userId    │  │  - conversID │  │  - userId    │  │
│  │  - createdAt │  │  - sender    │  │  - status    │  │
│  └──────────────┘  │  - content   │  └──────────────┘  │
│                    │  - timestamp │                    │
│                    └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Example: Chat Message
```
1. User Input (Frontend)
   ↓
2. HTTP POST to /api/chat/messages
   ↓
3. Backend Validation & Processing
   ↓
4. Prisma ORM Query to Database
   ↓
5. Message Persistence
   ↓
6. Response Generation (Router Service)
   ↓
7. HTTP Response to Frontend
   ↓
8. UI Update & Display
```

---

## Technology Stack

### Frontend Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^18.2.0 | UI Component Framework |
| **TypeScript** | ^5.0.0 | Type Safety & Development |
| **Vite** | ^5.0.0 | Build Tool & Dev Server |
| **@vitejs/plugin-react** | ^4.0.0 | React Integration for Vite |
| **@types/react** | ^18.2.0 | React Type Definitions |
| **@types/react-dom** | ^18.2.0 | React DOM Type Definitions |

### Backend Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Hono** | ^4.0.0 | Web Framework |
| **@hono/node-server** | ^1.0.0+ | Node.js Server Adapter |
| **@prisma/client** | ^5.0.0 | ORM & Database Client |
| **Prisma** | ^5.0.0 | Database Schema Management |
| **TypeScript** | ^5.0.0 | Type Safety |
| **tsx** | ^4.0.0 | TypeScript Execution |
| **@types/node** | ^25.0.8 | Node.js Type Definitions |

### Database Stack
| Technology | Purpose |
|-----------|---------|
| **PostgreSQL** | Relational Database |
| **Supabase** | Cloud Database Hosting & Management |

### Development Tools
| Tool | Purpose |
|------|---------|
| **npm** | Package Manager |
| **Git** | Version Control |
| **Prisma Studio** | Database GUI & Data Management |

---

## Installation & Setup

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd FullStackAPI_ai
```

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo "DATABASE_URL=postgresql://user:password@host:port/database" > .env

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed
```

### Step 3: Frontend Setup
```bash
cd ../Frontend

# Install dependencies
npm install
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
# Server runs on http://localhost:5173
```

---

## Development

### Project Structure
```
FullStackAPI_ai/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Server entry point
│   │   ├── router.ts             # Route definitions
│   │   ├── controllers/
│   │   │   ├── chatControllers.ts    # Chat endpoints
│   │   │   ├── agentcontrollers.ts   # Agent endpoints
│   │   │   └── healthcontrollers.ts  # Health check endpoint
│   │   ├── services/
│   │   │   ├── routerService.ts      # Message routing
│   │   │   ├── orderService.ts       # Order management
│   │   │   ├── billingService.ts     # Billing operations
│   │   │   └── supportService.ts     # Support operations
│   │   ├── db/
│   │   │   ├── prisma.ts            # Prisma client instance
│   │   │   └── seed.ts              # Database seeding
│   │   └── middleware/
│   │       └── errorHandler.ts      # Global error handling
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   ├── seed.ts                  # Seed script
│   │   ├── prisma.config.ts         # Prisma configuration
│   │   └── migrations/              # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                         # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── main.tsx                 # React entry point
│   │   ├── index.css                # Global styles
│   │   ├── api/
│   │   │   └── client.ts            # API client
│   │   ├── components/
│   │   │   ├── AgentInfo.tsx        # Agent information
│   │   │   ├── ChatWindow.tsx       # Chat interface
│   │   │   └── ConversationList.tsx # Conversation list
│   │   └── pages/
│   │       ├── ChatPage.tsx         # Chat page
│   │       └── AgentsPage.tsx       # Agents page
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                        # This file
```

### Development Scripts

#### Backend
```bash
npm run dev              # Start development server
npm run prisma          # Run Prisma CLI commands
```

#### Frontend
```bash
npm run dev             # Start Vite development server
npm run build           # Build for production
npm run preview         # Preview production build
```

### Code Style Guidelines
- **Language**: TypeScript
- **Formatting**: 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for classes/components
- **Comments**: JSDoc for public functions and complex logic

---

## Testing Procedures

### 1. Backend Health Check
**Purpose**: Verify backend is running and accessible

```bash
curl http://localhost:3000/api/health
```

**Expected Response**:
```json
{
  "status": "ok"
}
```

**Status Code**: `200 OK`

---

### 2. Retrieve Available Agents
**Purpose**: Verify agent management system is functional

```bash
curl http://localhost:3000/api/agents
```

**Expected Response**:
```json
["support", "order", "billing"]
```

**Status Code**: `200 OK`

---

### 3. Get Agent Capabilities
**Purpose**: Verify agent capability retrieval

```bash
curl http://localhost:3000/api/agents/support/capabilities
```

**Expected Response**:
```json
["FAQs", "Troubleshooting", "Conversation history"]
```

**Variations**:
- `/api/agents/order/capabilities` → Order-related capabilities
- `/api/agents/billing/capabilities` → Billing-related capabilities

**Status Code**: `200 OK`

---

### 4. Database Connection Test
**Purpose**: Verify database connectivity and table creation

```bash
# Method 1: Using Prisma Studio (Interactive GUI)
npx prisma studio
# Opens: http://localhost:5555

# Method 2: Using Prisma CLI
npx prisma db execute --stdin << EOF
SELECT COUNT(*) as table_count FROM information_schema.tables 
WHERE table_schema = 'public';
EOF
```

**Expected**: 
- Prisma Studio displays all tables (Conversation, Message, Order, Payment)
- Database query returns table count > 0

---

### 5. Create Conversation Test
**Purpose**: Verify chat creation and message handling

```bash
# Create a new conversation
curl -X POST http://localhost:3000/api/chat/messages \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "test-conversation-1",
    "message": "Hello, can you help me?"
  }'
```

**Expected Response**:
```json
{
  "content": "I can help you with...",
  "conversationId": "test-conversation-1"
}
```

**Status Code**: `201 Created` or `200 OK`

---

### 6. Retrieve Conversation Messages
**Purpose**: Verify message persistence and retrieval

```bash
curl http://localhost:3000/api/chat/conversations/test-conversation-1
```

**Expected Response**:
```json
[
  {
    "id": "msg-1",
    "conversationId": "test-conversation-1",
    "sender": "user",
    "content": "Hello, can you help me?",
    "timestamp": "2026-01-15T10:30:00Z"
  },
  {
    "id": "msg-2",
    "conversationId": "test-conversation-1",
    "sender": "agent",
    "content": "I can help you with...",
    "timestamp": "2026-01-15T10:30:05Z"
  }
]
```

**Status Code**: `200 OK`

---

### 7. Frontend Load Test
**Purpose**: Verify frontend loads without errors

```bash
# In browser, navigate to:
http://localhost:5173
```

**Expected**:
- React app loads successfully
- No console errors
- Chat interface is visible
- Agent list displays correctly

**Browser DevTools Check**:
```javascript
// Console should be error-free
// Network tab should show:
// - main.tsx loaded
// - API calls to localhost:3000 succeed
```

---

### 8. Frontend-Backend Communication Test
**Purpose**: Verify API client in frontend can communicate with backend

```javascript
// In Browser DevTools Console:
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend Response:', data))
  .catch(err => console.error('Error:', err));
```

**Expected Console Output**:
```javascript
Backend Response: {status: 'ok'}
```

---

### Complete Testing Checklist

| # | Test | Command/Action | Expected Result | Pass/Fail |
|---|------|----------------|-----------------|-----------|
| 1 | Backend Running | `curl http://localhost:3000/api/health` | `{"status":"ok"}` | ☐ |
| 2 | Agents Available | `curl http://localhost:3000/api/agents` | Array of agents | ☐ |
| 3 | Agent Capabilities | `curl http://localhost:3000/api/agents/support/capabilities` | Array of capabilities | ☐ |
| 4 | Database Connected | `npx prisma studio` | GUI shows tables | ☐ |
| 5 | Frontend Loads | Visit `http://localhost:5173` | React app visible | ☐ |
| 6 | Create Message | POST `/api/chat/messages` | Response 200/201 | ☐ |
| 7 | Get Conversations | GET `/api/chat/conversations/:id` | Messages returned | ☐ |
| 8 | Frontend-Backend Link | Browser console fetch test | Success response | ☐ |

---

## API Endpoints

### Health Check Endpoint
```
GET /api/health
```
- **Description**: Check backend server health status
- **Parameters**: None
- **Response**: `{"status": "ok"}`
- **Status Code**: 200

### Chat Endpoints

#### Send Message
```
POST /api/chat/messages
```
- **Description**: Send a message and receive AI response
- **Body**: 
  ```json
  {
    "conversationId": "string",
    "message": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "content": "string",
    "conversationId": "string"
  }
  ```
- **Status Code**: 201/200

#### Get Conversation Messages
```
GET /api/chat/conversations/:id
```
- **Description**: Retrieve all messages in a conversation
- **Parameters**: 
  - `:id` - Conversation ID
- **Response**: Array of message objects
- **Status Code**: 200

### Agent Endpoints

#### List Available Agents
```
GET /api/agents
```
- **Description**: Get list of all available AI agents
- **Parameters**: None
- **Response**: `["support", "order", "billing"]`
- **Status Code**: 200

#### Get Agent Capabilities
```
GET /api/agents/:type/capabilities
```
- **Description**: Get capabilities of a specific agent
- **Parameters**: 
  - `:type` - Agent type (support, order, billing)
- **Response**: Array of capability strings
- **Status Code**: 200

---

## Database Schema

### Conversation Table
```sql
CREATE TABLE "Conversation" (
  id        String   @id @default(uuid())
  userId    String
  messages  Message[]
  createdAt DateTime @default(now())
)
```

### Message Table
```sql
CREATE TABLE "Message" (
  id             String   @id @default(uuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  sender         String
  content        String
  timestamp      DateTime @default(now())
)
```

### Order Table
```sql
CREATE TABLE "Order" (
  id           String   @id @default(uuid())
  userId       String
  status       String
  deliveryDate DateTime?
)
```

### Payment Table
```sql
CREATE TABLE "Payment" (
  id        String   @id @default(uuid())
  userId    String
  amount    Float
  status    String
  invoiceId String
)
```

### Schema Relationships
```
Conversation (1) ──────→ (M) Message
Order (1) ──────→ (M) Items
Payment (1) ──────→ (M) Transactions
```

---

## Troubleshooting

### Issue: Backend won't start - Port 3000 already in use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or use different port in code
```

### Issue: Frontend won't load - Port 5173 error
```bash
# Kill Vite process
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Restart
npm run dev
```

### Issue: Database connection failed
```bash
# Verify .env file exists in backend/
cat backend/.env

# Check DATABASE_URL format
# postgresql://username:password@host:port/database

# Test connection
psql "postgresql://user:password@host:port/database"
```

### Issue: Prisma migration errors
```bash
# Reset database (dev only - loses data)
npx prisma migrate reset --force

# Or create new migration
npx prisma migrate dev --name <migration_name>

# Sync without creating migration
npx prisma db push
```

### Issue: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules

# Reinstall
npm install
```

### Issue: Module not found errors
```bash
# Rebuild TypeScript
npx tsc --build

# Or restart dev server
npm run dev
```

### Issue: CORS errors between frontend and backend
```javascript
// Add to backend/src/index.ts
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});
```

---

## Performance Considerations

### Frontend Optimization
- Lazy load React components
- Implement code splitting with Vite
- Cache API responses where appropriate

### Backend Optimization
- Implement request caching
- Use connection pooling for database
- Optimize database queries with indexes

### Database Optimization
- Create indexes on frequently queried columns
- Archive old conversations regularly
- Monitor query performance

---

## Security Recommendations

1. **Environment Variables**: Never commit `.env` files
2. **Input Validation**: Validate all user inputs on backend
3. **Authentication**: Implement JWT tokens for user sessions
4. **HTTPS**: Use HTTPS in production
5. **SQL Injection**: Use Prisma ORM to prevent SQL injection
6. **Rate Limiting**: Implement rate limiting on API endpoints

---

## Deployment

### Production Build - Frontend
```bash
cd Frontend
npm run build
# Creates optimized build in dist/
```

### Production Build - Backend
```bash
cd backend
npm run build
# Create production-ready server
```

### Deployment Platforms
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, AWS Lambda, Digital Ocean
- **Database**: Supabase, AWS RDS, Google Cloud SQL

---

## Contributing Guidelines

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "Add feature description"`
3. Push to remote: `git push origin feature/feature-name`
4. Create Pull Request for review

---

## License
[Specify your license here]

---

## Support & Contact
For issues or questions, contact: [your-contact-info]

---

**Last Updated**: January 15, 2026
**Version**: 1.0.0
