import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchContent } from '../api/client';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  prediction?: string;
  detailedAnalysis?: string;
  confidence?: number;
  tier: string;
  timestamp: string;
}

interface ContentResponse {
  content: ContentItem[];
  tier: string;
  message: string;
}

export function Content() {
  const { token } = useAuth();
  const [data, setData] = useState<ContentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchContent(token)
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="content-section">
      <h2>📊 Electoral Astrology Insights</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>{data.message}</p>
      
      <div style={{ marginTop: '20px' }}>
        {data.content.map((item) => (
          <div 
            key={item.id} 
            className="card" 
            style={{ 
              marginBottom: '15px',
              borderLeft: `4px solid ${
                item.tier === 'free' ? '#888' : 
                item.tier === 'basic' ? '#4CAF50' : 
                '#FF9800'
              }`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
              <span style={{ 
                fontSize: '12px', 
                padding: '4px 8px', 
                borderRadius: '4px',
                backgroundColor: item.tier === 'free' ? '#eee' : 
                                item.tier === 'basic' ? '#e8f5e9' : 
                                '#fff3e0',
                color: item.tier === 'free' ? '#666' : 
                       item.tier === 'basic' ? '#2e7d32' : 
                       '#e65100'
              }}>
                {item.tier.toUpperCase()}
              </span>
            </div>
            <p style={{ textAlign: 'left' }}>{item.description}</p>
            {item.prediction && (
              <p style={{ textAlign: 'left', fontStyle: 'italic', color: '#555' }}>
                <strong>Prediction:</strong> {item.prediction}
              </p>
            )}
            {item.detailedAnalysis && (
              <p style={{ textAlign: 'left', fontSize: '14px', color: '#777' }}>
                <strong>Analysis:</strong> {item.detailedAnalysis}
              </p>
            )}
            {item.confidence && (
              <p style={{ textAlign: 'left', fontSize: '14px' }}>
                <strong>Confidence:</strong> {(item.confidence * 100).toFixed(0)}%
              </p>
            )}
            <p style={{ textAlign: 'left', fontSize: '12px', color: '#999', marginTop: '10px' }}>
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}