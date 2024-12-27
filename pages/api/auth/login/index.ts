import { hashPassword, verifyPassword } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === "POST") {
      const { email, password } = req.body;
      
      if(!email || !password) {
        return res.status(400).json({ message: 'Invalid Inputs' });
      }

      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if(!user) {
        return res.status(400).json({ message: 'Email tidak terdaftar' });
      }

      const validPassword = await verifyPassword(password, user?.password);

      if(!validPassword) {
        return res.status(400).json({ message: 'Password anda salah' });
      }

      return res.status(200).json({ message: 'Login sukses', data: user });
    }
  } catch(error) {

  }
}