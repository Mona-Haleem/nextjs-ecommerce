import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/data/db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const user = db.users.find(u => u.id === id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.method === 'GET') {
    res.status(200).json(user);
  } else if (req.method === 'PATCH') {
    Object.assign(user, req.body);
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    const index = db.users.findIndex(u => u.id === id);
    db.users.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
