import { isAuthenticated } from "@/utils/helpers";
import { AttendanceStatus, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

const permitHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, permit_date } = req.body;
  const data = {
    userId: user_id,
    status: AttendanceStatus.Absent
  };

  const attendance = await prisma.attendance.create({
    data: data
  });

  return res.status(200).json({ 
    message: 'You have successfully to permit!',
    data: attendance 
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!(await isAuthenticated(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    };

    if(req.method === "POST") {
      const response = await permitHandler(req, res);

      return response;
    }

    return res.status(405).json({ message: 'Method not allowed' })
    
  } catch(error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}