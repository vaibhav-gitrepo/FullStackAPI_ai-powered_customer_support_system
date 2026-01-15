import { useState, useEffect } from 'react';

interface Agent {
  type: string;
  capabilities: string[];
  icon: string;
  description: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agentsRes = await fetch('http://localhost:3000/api/agents');
        const agentsList: string[] = await agentsRes.json();

        const agentsWithCapabilities = await Promise.all(
          agentsList.map(async (type) => {
            const capRes = await fetch(
              `http://localhost:3000/api/agents/${type}/capabilities`
            );
            const capabilities = await capRes.json();
            return { type, capabilities };
          })
        );

        // Add descriptions and icons
        const agentsData: Agent[] = agentsWithCapabilities.map((agent) => {
          const descriptions: Record<string, string> = {
            support:
              'Our Support Agent is here to help with common questions, troubleshooting, and access your conversation history.',
            order:
              'Track your orders in real-time, check delivery status, and manage your purchases with ease.',
            billing:
              'Manage your billing information, view invoices, and handle refund requests effortlessly.',
          };

          return {
            ...agent,
            icon:
              agent.type === 'support'
                ? '🎧'
                : agent.type === 'order'
                  ? '📦'
                  : '💳',
            description: descriptions[agent.type] || 'AI Agent',
          };
        });

        setAgents(agentsData);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="app-header">
        <h1>
          <span className="app-header-icon">🤖</span>
          Our AI Agents
        </h1>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', background: '#f5f7fa', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '18px', color: '#999' }}>Loading agents...</div>
            </div>
          ) : (
            <>
              {/* Agents Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '30px',
                  marginBottom: '60px'
                }}
              >
                {agents.map((agent) => (
                  <div
                    key={agent.type}
                    style={{
                      background: 'white',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: selectedAgent === agent.type ? 'scale(1.05)' : 'scale(1)',
                      border:
                        selectedAgent === agent.type
                          ? '2px solid #667eea'
                          : '2px solid transparent'
                    }}
                    onClick={() => setSelectedAgent(selectedAgent === agent.type ? null : agent.type)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = selectedAgent === agent.type ? 'scale(1.05)' : 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {/* Agent Header */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '30px 20px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                        {agent.icon}
                      </div>
                      <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '700' }}>
                        {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)} Agent
                      </h2>
                      <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                        Specialized AI Assistant
                      </p>
                    </div>

                    {/* Agent Body */}
                    <div style={{ padding: '20px' }}>
                      <p style={{ margin: '0 0 20px', color: '#666', lineHeight: '1.6' }}>
                        {agent.description}
                      </p>

                      <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: '#333' }}>
                          What I can help with:
                        </h3>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          {agent.capabilities.map((capability, index) => (
                            <div
                              key={index}
                              style={{
                                padding: '8px 12px',
                                background: '#f5f5f5',
                                borderLeft: '3px solid #667eea',
                                borderRadius: '4px',
                                fontSize: '13px'
                              }}
                            >
                              ✓ {capability}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
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
                        Chat with {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Section */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}
              >
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
                  How Our Agents Work
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h3 style={{ color: '#667eea', marginBottom: '10px' }}>🚀 Smart Routing</h3>
                    <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
                      Our system automatically routes your questions to the most suitable agent
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: '#667eea', marginBottom: '10px' }}>💡 Intelligent Responses</h3>
                    <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
                      AI-powered responses tailored to your specific needs
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: '#667eea', marginBottom: '10px' }}>📚 Learning System</h3>
                    <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
                      Our agents continuously improve from every interaction
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: '#667eea', marginBottom: '10px' }}>🔄 Multi-Agent Support</h3>
                    <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
                      Transfer between agents seamlessly during conversations
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
