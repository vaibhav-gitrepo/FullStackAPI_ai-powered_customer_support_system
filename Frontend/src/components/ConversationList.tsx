export default function ConversationList({
  conversations,
  active,
  onSelect,
  onNewChat,
}: {
  conversations: string[];
  active: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}) {
  return (
    <>
      <div className="sidebar-section">
        <button
          onClick={onNewChat}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginBottom: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          + New Conversation
        </button>
      </div>

      <div className="sidebar-section" style={{ flex: 1, overflowY: 'auto' }}>
        <div className="sidebar-title">Recent Conversations</div>
        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#999', fontSize: '14px' }}>
            No conversations yet
          </div>
        ) : (
          conversations.map((convId) => (
            <div
              key={convId}
              className={`conversation-item ${active === convId ? 'active' : ''}`}
              onClick={() => onSelect(convId)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💬</span>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>
                    {convId.includes('demo') ? 'Demo Chat' : 'Conversation'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
