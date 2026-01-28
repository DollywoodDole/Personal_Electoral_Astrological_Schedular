import { useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Content } from './components/Content';
import './App.css';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>🔮 Electoral Astrology Dashboard</h1>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Tier:</strong> <span style={{ 
              padding: '4px 8px', 
              borderRadius: '4px',
              backgroundColor: user.tier === 'free' ? '#eee' : 
                              user.tier === 'basic' ? '#e8f5e9' : 
                              '#fff3e0',
              color: user.tier === 'free' ? '#666' : 
                     user.tier === 'basic' ? '#2e7d32' : 
                     '#e65100',
              fontWeight: 'bold'
            }}>
              {user.tier.toUpperCase()}
            </span></p>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <Content />
    </div>
  );
}

export default App;