import { isAuthenticated } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!(await isAuthenticated(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    };

    if(req.method === "GET") {
      const projects = await prisma.project.findMany();

      res.status(200).json(
        {
          message: 'Success fetched data!',
          data: projects
        }
      );
    } else if(req.method === "POST") {
      const payload = {
        name: req.body?.project_name,
        location: req.body?.location,
        totalHours: req.body?.total_hours
      };

      const project = await prisma.project.create({
        data: payload
      });

      res.status(200).json(
        {
          message: 'Success created data!',
          data: project
        }
      );
    }
  } catch(error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}