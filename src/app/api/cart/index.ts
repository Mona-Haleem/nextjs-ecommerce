import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/data/db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(db.cart);
  } else if (req.method === 'POST') {
    const newCart = req.body;
    newCart.id = (db.cart.length + 1).toString();
    db.cart.push(newCart);
    res.status(201).json(newCart);
  } else {
    res.status(405).end();
  }
}
