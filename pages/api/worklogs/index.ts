import { isAuthenticated } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

const getWorklogsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { project_id, user_id, start_date, end_date }: TParams = req.query;

  const bulkProjectId = project_id?.split(",")?.map((n: string) => parseInt(n)) ?? [];

  const worklogs = await prisma.worklog.findMany({
    select: {
      date: true,
      project: true,
      hoursWorked: true,
      user: true,
      createdAt: true
    }
    // where: {
    //   date: {
    //     gte: new Date(`${start_date as string}T00:00:00.000Z`),
    //     lte: new Date(`${end_date as string}T23:59:59.999Z`)
    //   },
    //   projectId: { in: bulkProjectId },
    //   userId: user_id
    // }
  });

  return res.status(200).json({
    message: 'Success fetched data!',
    data: worklogs
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!(await isAuthenticated(req, res))) {
    return res.status(401).json({ message: 'Unauthorized' });
  };

  const response = await getWorklogsHandler(req, res);

  return response;
};