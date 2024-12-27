import { isAuthenticated } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!isAuthenticated(req, res)) {
    return res.status(401).json({ message: 'Unauthorized' });
  };

  const { query: { id }, body } = req;
  
  const payload = {
    name: body?.project_name,
    location: body?.location,
  };

  try {
    if(req.method === "PUT") {
      if(id) {
        const projects = await prisma.project.update({
          where: {
            id: id as string
          },
          data: payload
        });

        res.status(200).json(
          {
            message: 'Success update data!',
            data: projects
          }
        );
    };

    } else if(req.method === "DELETE") {

      const project = await prisma.project.delete({
        where: {
          id: id as string
        }
      });

      res.status(200).json(
        {
          message: 'Success deleted data!',
          data: project
        }
      );
    }
  } catch(error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}