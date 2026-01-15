export async function sendMessage(conversationId: string, message: string) {
  const res = await fetch('/api/chat/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, message })
  });
  return res.json();
}
