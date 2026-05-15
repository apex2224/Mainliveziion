import React, { useState, useEffect } from 'react';

const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#facc15' }}>
      <form onSubmit={handleLogin} style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#111', display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <h2 style={{ textAlign: 'center', margin: 0, color: '#facc15' }}>Admin Access</h2>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa', margin: 0 }}>Restricted Area</p>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter Admin Password" 
          style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#222', color: '#fff', outline: 'none' }}
        />
        {error && <span style={{ color: '#ff4d4d', fontSize: '0.8rem', textAlign: 'center' }}>{error}</span>}
        <button type="submit" style={{ padding: '0.8rem', borderRadius: '4px', border: 'none', backgroundColor: '#facc15', color: '#0a0a0a', fontWeight: 'bold', cursor: 'pointer' }}>
          Unlock Panel
        </button>
      </form>
    </div>
  );
};

export default AdminProtectedRoute;
