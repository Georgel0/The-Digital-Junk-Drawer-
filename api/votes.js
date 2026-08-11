import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // GET: Fetch all vote counts on page load
  if (req.method === 'GET') {
    try {
      // We store all votes in a single Redis Hash called "project_votes"
      const votes = await kv.hgetall('project_votes');
      return res.status(200).json(votes || {});
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch votes' });
    }
  }

  // POST: Update a vote when clicked
  if (req.method === 'POST') {
    try {
      const { id, action } = req.body; // action will be 1 (upvote) or -1 (remove vote)
      
      if (!id || (action !== 1 && action !== -1)) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      // Increment or decrement the specific project ID within the Hash
      const newTotal = await kv.hincrby('project_votes', id, action);
      
      return res.status(200).json({ id, votes: newTotal });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update vote' });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method Not Allowed' });
}