import { secretKey } from '@/utils/auth';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  if (email === 'usuario@email.com' && password === 'senha123') {
    const token = jwt.sign({ id: 1, email }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  if(email === 'usuario2@email.com' && password === 'senha1234') {
    const token = jwt.sign({ id: 2, email }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
}