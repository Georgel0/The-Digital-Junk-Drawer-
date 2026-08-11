import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // GET: Fetch the current total community clicks
  if (req.method === 'GET') {
    try {
      const count = await kv.get('global_eye_clicks') || 0;
      return res.status(200).json({ count });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch count' });
    }
  }

  // POST: Increment the community click count by 1
  if (req.method === 'POST') {
    try {
      const newTotal = await kv.incr('global_eye_clicks');
      return res.status(200).json({ count: newTotal });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update count' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}