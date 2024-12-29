import { isAuthenticated } from "@/utils/helpers";
import { AttendanceStatus, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

const checkOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, checkout_date, projects } = req.body;
  const { id } = req.query;
  const payloadAttendance = {
    userId: user_id,
    checkout_date: new Date(checkout_date),
    status: AttendanceStatus.OnLeave
  };

  if(Array.isArray(projects)) {
    
    const attendance = await prisma.attendance.update({
      data: payloadAttendance,
      where: {
        id: id as string
      }
    });

    const x = projects.forEach(async (project) => {
      const payloadWorklog = {
        userId: user_id,
        projectId: project.project_id,
        date: new Date(checkout_date as string),
        hoursWorked: parseFloat(project.hours_worked),
      };

      const worklog = await prisma.worklog.create({
        data: payloadWorklog
      });

      return worklog;
    });
    
    return res.status(200).json({ 
      message: 'You have successfully to check-out!',
      data: attendance 
    });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!(await isAuthenticated(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    };
    
    if(req.method === "PUT") {
      const response = await checkOutHandler(req, res);

      return response;
    }

    return res.status(405).json({ message: 'Method not allowed' })
    
  } catch(error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}