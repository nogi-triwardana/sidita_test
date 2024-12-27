import { isAuthenticated } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/helpers";

const prisma = new PrismaClient;

const getEmployeesListHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const employees = await prisma.user.findMany({
    where: {
      role: 'user'
    },
    select: {
      name: true,
      email: true,
      department: true,
    }
  });

  return res.status(200).json({
    message: 'Success fetched data!',
    data: employees
  });
};

const postEmployeeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = {
    name: req.body?.name,
    department: req.body?.departement,
    email: req.body?.email,
    password: hashPassword(req.body?.password),
    role: req.body?.role,
  };
  
  const employee = await prisma.user.create({
    data: payload
  });

  return res.status(200).json({
    message: 'Success created data!',
  });
};

const putEmployeeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const payload = {
    name: req.body?.name,
    department: req.body?.departement,
    email: req.body?.email,
    password: hashPassword(req.body?.password),
    role: req.body?.role,
  };

  if(!id) {
    return res.status(400).json({ message: 'Undefined id data' })
  };

  const employee = await prisma.user.update({
    data: payload,
    where: {
      id: id as string
    }
  });

  return res.status(200).json({
    message: 'Success edit data!',
  });
};

const deleteEmployeeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if(!id) {
    return res.status(400).json({ message: 'Undefined id data' })
  }

  const employee = await prisma.user.delete({
    where: {
      id: id as string
    }
  });

  return res.status(200).json({
    message: 'success deleted data!',
  })
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!(await isAuthenticated(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    };

    if(req.method === "GET") {
      const response = await getEmployeesListHandler(req, res);
      
      return response;
    }

    if(req.method === "POST") {
      const response = await postEmployeeHandler(req, res);
      
      return response;
    }

    if(req.method === "PUT") {
      const response = await putEmployeeHandler(req, res);
      
      return response;
    }

    if(req.method === "DELETE") {
      const response = await deleteEmployeeHandler(req, res);
      
      return response;
    }

  } catch(error) {

  }
}