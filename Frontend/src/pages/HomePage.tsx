export default function HomePage({ onStartChat }: { onStartChat: () => void }) {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Hero Section */}
        <h1 className="home-header">
          🚀 Welcome to AI Support Center
        </h1>
        <p className="home-subtitle">
          Get instant help from our intelligent AI agents
        </p>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎧</div>
            <div className="feature-title">Support Agent</div>
            <div className="feature-desc">
              Get instant answers to FAQs, troubleshooting help, and conversation history
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <div className="feature-title">Order Agent</div>
            <div className="feature-desc">
              Track orders, check delivery status, and manage cancellations
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <div className="feature-title">Billing Agent</div>
            <div className="feature-desc">
              View invoices, request refunds, and manage payment methods
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-title">24/7 Available</div>
            <div className="feature-desc">
              Get help anytime, anywhere. Our AI is always ready to assist
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <div className="feature-title">Secure & Private</div>
            <div className="feature-desc">
              Your data is encrypted and protected with enterprise-grade security
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <div className="feature-title">Smart Routing</div>
            <div className="feature-desc">
              Automatic routing to the best agent based on your needs
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="home-buttons">
          <button className="home-btn btn-primary" onClick={onStartChat}>
            Start Chatting Now
          </button>
          <button className="home-btn btn-secondary" onClick={() => alert('Documentation coming soon!')}>
            Learn More
          </button>
        </div>

        {/* Stats Section */}
        <div style={{
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          maxWidth: '600px',
          margin: '60px auto 0'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700' }}>3</div>
            <div style={{ fontSize: '14px', marginTop: '5px' }}>AI Agents</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700' }}>∞</div>
            <div style={{ fontSize: '14px', marginTop: '5px' }}>24/7 Support</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700' }}>100%</div>
            <div style={{ fontSize: '14px', marginTop: '5px' }}>Secure</div>
          </div>
        </div>
      </div>
    </div>
  );
}
