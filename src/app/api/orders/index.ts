import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/data/db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(db.orders);
  } else if (req.method === 'POST') {
    const newOrder = req.body;
    newOrder.id = (db.orders.length + 1).toString();
    db.orders.push(newOrder);
    res.status(201).json(newOrder);
  } else {
    res.status(405).end();
  }
}
