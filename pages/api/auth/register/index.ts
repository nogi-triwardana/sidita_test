import { hashPassword } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const payload = {
      name: req.body?.name,
      department: req.body?.departement,
      email: req.body?.email,
      password: hashPassword(req.body?.password),
      role: req.body?.role,
    };

    const user = await prisma.user.create({
      data: payload
    });

    res.status(201).json({
      message: 'Successfully register account!',
      data: user,
    });
    
  } catch(error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
    
}