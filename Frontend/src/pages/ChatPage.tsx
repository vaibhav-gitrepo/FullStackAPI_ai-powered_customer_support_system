import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ConversationList from '../components/ConversationList';
import AgentInfo from '../components/AgentInfo';

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState('demo-conv-1');
  const [conversations, setConversations] = useState(['demo-conv-1']);

  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    setConversations([...conversations, newId]);
    setActiveConversation(newId);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="app-header">
        <h1>
          <span className="app-header-icon">💬</span>
          AI Support Center
        </h1>
        <div className="header-nav">
          <button onClick={handleNewChat}>+ New Chat</button>
          <button>Settings</button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <ConversationList 
            conversations={conversations}
            active={activeConversation}
            onSelect={setActiveConversation}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="chat-container">
            {/* Chat Area */}
            <ChatWindow conversationId={activeConversation} />

            {/* Agent Panel */}
            <AgentInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
