import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email);
    } catch (err) {
      setError('Login failed. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h2>🔮 Login to Electoral Astrology</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '300px',
              marginBottom: '10px'
            }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login / Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <p style={{ fontSize: '14px', marginTop: '20px', color: '#666' }}>
        Enter any email to login or create an account
      </p>
    </div>
  );
}