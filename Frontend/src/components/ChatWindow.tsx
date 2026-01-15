import { useState } from 'react';
import { sendMessage } from '../api/client';

interface Message {
  sender: string;
  content: string;
}

export default function ChatWindow({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', content: input }]);
    setTyping(true);
    const response = await sendMessage(conversationId, input);
    setTyping(false);
    setMessages((prev) => [...prev, { sender: 'agent', content: response.content }]);
    setInput('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '500px' }}>
      <div style={{ minHeight: '200px', marginBottom: '10px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left' }}>
            <strong>{m.sender}:</strong> {m.content}
          </div>
        ))}
        {typing && <div><em>Agent is typing...</em></div>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '80%' }}
      />
      <button onClick={handleSend} style={{ width: '18%', marginLeft: '2%' }}>
        Send
      </button>
    </div>
  );
}

