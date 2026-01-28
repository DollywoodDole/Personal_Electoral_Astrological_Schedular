import { Router, Request, Response } from 'express';
import { db } from '../db/init';
import { generateToken, authenticate } from './jwt';

const router = Router();

// Login/Register endpoint (email-only, creates user if doesn't exist)
router.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    // Check if user exists
    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    // Create user if doesn't exist
    if (!user) {
      const result = db.prepare(
        'INSERT INTO users (email, tier) VALUES (?, ?)'
      ).run(email, 'free');
      
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as any;
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      tier: user.tier
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        tier: user.tier
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user info
router.get('/me', authenticate, (req: Request, res: Response) => {
  const user = (req as any).user;
  
  try {
    const dbUser = db.prepare('SELECT id, email, tier, created_at FROM users WHERE id = ?')
      .get(user.userId) as any;
    
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(dbUser);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;