import { Router, Request, Response } from 'express';
import { authenticate } from '../auth/jwt';

const router = Router();

// Mock electoral astrology data with tier-based access
const mockData = {
  free: [
    {
      id: 1,
      title: "Mercury Retrograde Alert",
      description: "Mercury goes retrograde next week. Expect communication delays in swing states.",
      timestamp: new Date().toISOString(),
      tier: "free"
    }
  ],
  basic: [
    {
      id: 2,
      title: "Mars in Aries - Campaign Energy Boost",
      description: "Mars enters Aries, bringing aggressive campaign tactics in the Midwest.",
      prediction: "Expect heated debates and increased voter turnout in key battleground states.",
      timestamp: new Date().toISOString(),
      tier: "basic"
    },
    {
      id: 3,
      title: "Venus Conjunction - Fundraising Opportunity",
      description: "Venus conjunction indicates prime time for fundraising events.",
      prediction: "Major donors will be more receptive during this 3-day window.",
      timestamp: new Date().toISOString(),
      tier: "basic"
    }
  ],
  premium: [
    {
      id: 4,
      title: "Jupiter-Saturn Opposition - Electoral Shift",
      description: "Rare Jupiter-Saturn opposition signals major political realignment.",
      prediction: "Unexpected swing in 3 key states. Detailed county-level predictions available.",
      detailedAnalysis: "Based on planetary alignments, expect shifts in PA, GA, and AZ...",
      confidence: 0.87,
      timestamp: new Date().toISOString(),
      tier: "premium"
    },
    {
      id: 5,
      title: "Full Moon Impact on Voter Sentiment",
      description: "Full moon in Libra affects undecided voters significantly.",
      prediction: "Poll numbers will shift 2-3% in favor of compromise candidates.",
      detailedAnalysis: "Historical correlation shows 78% accuracy for full moon predictions...",
      confidence: 0.92,
      timestamp: new Date().toISOString(),
      tier: "premium"
    }
  ]
};

// Get tiered content based on user's subscription
router.get('/', authenticate, (req: Request, res: Response) => {
  const user = (req as any).user;
  const tier = user.tier || 'free';

  let content = [...mockData.free];

  if (tier === 'basic' || tier === 'premium') {
    content = [...content, ...mockData.basic];
  }

  if (tier === 'premium') {
    content = [...content, ...mockData.premium];
  }

  res.json({
    content,
    tier,
    message: `Showing content for ${tier.toUpperCase()} tier`
  });
});

export default router;