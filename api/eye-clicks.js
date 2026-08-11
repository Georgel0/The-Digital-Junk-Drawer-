import redis from '../lib/redis.js';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const count = await redis.get('global_eye_clicks') || 0;
      return res.status(200).json({ count });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch count' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newTotal = await redis.incr('global_eye_clicks');
      return res.status(200).json({ count: newTotal });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update count' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}