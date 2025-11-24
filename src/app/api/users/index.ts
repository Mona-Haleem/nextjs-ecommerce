import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/data/db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(db.users);
  } else if (req.method === 'POST') {
    const newUser = req.body;
    newUser.id = crypto.randomUUID();
    db.users.push(newUser); // in-memory only
    res.status(201).json(newUser);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
