import { useState, useEffect } from 'react';

interface Agent {
  type: string;
  capabilities: string[];
}

export default function AgentInfo() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Get agents list
        const agentsRes = await fetch('http://localhost:3000/api/agents');
        const agentsList: string[] = await agentsRes.json();

        // Get capabilities for each agent
        const agentsWithCapabilities = await Promise.all(
          agentsList.map(async (type) => {
            const capRes = await fetch(
              `http://localhost:3000/api/agents/${type}/capabilities`
            );
            const capabilities = await capRes.json();
            return { type, capabilities };
          })
        );

        setAgents(agentsWithCapabilities);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const agentEmojis: Record<string, string> = {
    support: '🎧',
    order: '📦',
    billing: '💳',
  };

  return (
    <div className="agent-panel">
      <div className="agent-title">
        <span style={{ fontSize: '24px', marginRight: '8px' }}>🤖</span>
        Available Agents
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          <div style={{ animation: 'typing 1.4s infinite' }}>Loading agents...</div>
        </div>
      ) : agents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          No agents available
        </div>
      ) : (
        agents.map((agent) => (
          <div
            key={agent.type}
            className="agent-item"
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(102, 126, 234, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="agent-name">
              {agentEmojis[agent.type] || '🤖'} {agent.type.toUpperCase()}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Click to chat about {agent.type} topics
            </div>
            {agent.capabilities.map((capability, index) => (
              <div key={index} className="agent-capability">
                ✓ {capability}
              </div>
            ))}
          </div>
        ))
      )}

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '10px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center'
        }}
      >
        💡 <strong>Tip:</strong> Try asking any of these agents for help with their specific area!
      </div>
    </div>
  );
}
