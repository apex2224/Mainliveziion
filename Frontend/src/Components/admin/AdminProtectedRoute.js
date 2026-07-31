import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Shield, ArrowLeft } from 'lucide-react';

const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Ziion@152') { // Simple hardcoded password for admin access
      localStorage.setItem('isAdminAuth', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Invalid Password');
    }
  };

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return children;
  }

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f1f5f9',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    gridOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      pointerEvents: 'none',
    },
    card: {
      position: 'relative',
      zIndex: 10,
      padding: '2.5rem 2rem',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      width: '380px',
      maxWidth: '90vw',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'box-shadow 0.3s ease',
      animation: 'fadeIn 0.5s ease forwards',
    },
    logoBox: {
      width: '64px',
      height: '64px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 0.5rem',
      boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
    },
    title: {
      textAlign: 'center',
      margin: 0,
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0f172a',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#64748b',
      margin: '-0.5rem 0 0',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      margin: '0 auto',
      padding: '6px 16px',
      borderRadius: '100px',
      background: 'rgba(59, 130, 246, 0.08)',
      border: '1px solid rgba(59, 130, 246, 0.15)',
      fontSize: '0.72rem',
      color: '#3b82f6',
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    inputIcon: {
      position: 'absolute',
      left: '14px',
      color: focused ? '#3b82f6' : '#94a3b8',
      transition: 'color 0.3s ease',
      pointerEvents: 'none',
    },
    input: {
      width: '100%',
      padding: '0.9rem 1rem 0.9rem 2.8rem',
      borderRadius: '12px',
      border: `1.5px solid ${focused ? '#3b82f6' : '#e2e8f0'}`,
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      outline: 'none',
      fontSize: '0.95rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
      boxSizing: 'border-box',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.8rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
    },
    button: {
      padding: '0.9rem',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#ffffff',
      fontWeight: 600,
      fontSize: '0.95rem',
      cursor: 'pointer',
      fontFamily: 'inherit',
      letterSpacing: '0.01em',
      transition: 'all 0.25s ease',
      boxShadow: '0 2px 8px rgba(59,130,246,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    divider: {
      height: '1px',
      background: '#e2e8f0',
      margin: '0.25rem 0',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      fontSize: '0.72rem',
      color: '#94a3b8',
    },
    backLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      fontSize: '0.75rem',
      color: '#3b82f6',
      textDecoration: 'none',
      opacity: 0.85,
      transition: 'opacity 0.2s ease',
      cursor: 'pointer',
    },
  };

  // Keyframe injection
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    input::placeholder {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    input:focus::placeholder {
      color: #64748b;
    }
  `;

  return (
    <div style={styles.wrapper}>
      <style>{keyframes}</style>
      <div style={styles.gridOverlay} />

      <form
        onSubmit={handleLogin}
        style={styles.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = styles.card.boxShadow;
        }}
      >
        {/* Logo */}
        <div style={styles.logoBox}>
          <Sparkles size={28} color="#ffffff" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h2 style={styles.title}>Ziion CMS</h2>
        <p style={styles.subtitle}>Admin Panel</p>

        {/* Secure Badge */}
        <div style={styles.badge}>
          <Lock size={12} />
          Secure Access
        </div>

        <div style={styles.divider} />

        {/* Input */}
        <div style={styles.inputWrapper}>
          <div style={styles.inputIcon}>
            <Lock size={16} />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter admin password"
            style={styles.input}
          />
        </div>

        {/* Error */}
        {error && (
          <span style={styles.error}>
            <Lock size={12} />
            {error}
          </span>
        )}

        {/* Button */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = styles.button.boxShadow;
          }}
        >
          <Lock size={16} />
          Unlock Panel
        </button>

        <div style={styles.divider} />

        {/* Footer */}
        <div style={styles.footer}>
          <Shield size={12} />
          <span>Protected area &mdash; authorized personnel only</span>
        </div>

        <a
          href="/"
          style={styles.backLink}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; }}
        >
          <ArrowLeft size={14} />
          Back to Website
        </a>
      </form>
    </div>
  );
};

export default AdminProtectedRoute;
