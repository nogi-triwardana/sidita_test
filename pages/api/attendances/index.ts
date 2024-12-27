import { isAuthenticated } from "@/utils/helpers";
import { AttendanceStatus, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

const getAttendancesListHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, date, status } = req.query;

  // get attendances detail by user id after check in
  if(user_id && date) {
      const attendance = await prisma.attendance.findFirst({
        where: {
          userId: user_id as string,
          checkin_date: {
            lte: new Date(`${date as string}T23:59:59.999Z`),
            gte: new Date(`${date as string}T00:00:00.000Z`)
          }
        }
      });

      return res.status(200).json({ 
        message: 'Success fetched data', 
        data: attendance 
      });
  } else {
    const {
      user_id,
      start_date,
      end_date
     } = req.query;
     let attendances;
    
    if(user_id && start_date && end_date) {
      attendances = await prisma.attendance.findMany({
        where: {
          userId: user_id as string,
          checkin_date: {
            lte: new Date(`${end_date as string}T23:59:59.999Z`),
            gte: new Date(`${start_date as string}T00:00:00.000Z`)
          }
        }
      });
    } else {
      attendances = await prisma.attendance.findMany({
        select: {
          user: true,
          checkin_date: true,
          checkout_date: true,
          reason: true,
          status: true,
          createdAt: true,
          id: true
        }
      });
    }

    return res.status(200).json(
      {
        message: 'Success fetched data!',
        data: attendances
      }
    );
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!(await isAuthenticated(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    };

    const response = await getAttendancesListHandler(req, res);

    return response;

    // return res.status(400).json({ message: 'Invalid request' });

  } catch(error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};