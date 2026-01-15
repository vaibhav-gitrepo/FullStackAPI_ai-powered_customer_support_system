import ChatWindow from '../components/ChatWindow';

export default function ChatPage() {
  // For demo purposes, we hardcode a conversation ID
  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Support Chat</h1>
      <ChatWindow conversationId="demo-conv-1" />
    </div>
  );
}
