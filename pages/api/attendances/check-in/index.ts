import { isAuthenticated } from "@/utils/helpers";
import { AttendanceStatus, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

const checkInHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, checkin_date } = req.body;
  const payload = {
    userId: user_id,
    checkin_date: new Date(checkin_date as string),
    status: AttendanceStatus.Present,
    reason: '-'
  };

  const attendance = await prisma.attendance.create({
    data: payload
  });

  return res.status(200).json({ 
    message: 'You have successfully to check-in!',
    data: attendance 
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!(await isAuthenticated(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    };

    const response = await checkInHandler(req, res);

    return response;

  } catch(error) {
    throw error;
    // res.status(500).json({ message: 'Internal server error' });
  }
}