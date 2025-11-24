import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/data/db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const cart = db.cart.find(c => c.id === id);

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  if (req.method === 'GET') {
    res.status(200).json(cart);
  } else if (req.method === 'PATCH') {
    Object.assign(cart, req.body);
    res.status(200).json(cart);
  } else if (req.method === 'DELETE') {
    const index = db.cart.findIndex(c => c.id === id);
    db.cart.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
