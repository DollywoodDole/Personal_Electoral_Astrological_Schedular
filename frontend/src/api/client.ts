const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001'
  : 'https://your-backend-domain.com';

export async function fetchHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) {
    throw new Error('Failed to fetch health status');
  }
  return response.json();
}

export async function fetchContent(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/content`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }
  return response.json();
}