import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/data/db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const order = db.orders.find(o => o.id === id);

  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.method === 'GET') {
    res.status(200).json(order);
  } else if (req.method === 'PATCH') {
    Object.assign(order, req.body);
    res.status(200).json(order);
  } else if (req.method === 'DELETE') {
    const index = db.orders.findIndex(o => o.id === id);
    db.orders.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
