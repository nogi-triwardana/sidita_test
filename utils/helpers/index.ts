import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt"
import { useCallback, useEffect, useRef } from "react";

const secret = process.env.SECRET

export function hashPassword(password: string) {
  const saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltRounds);
};

export async function verifyPassword(password: any, hashedPassword: any) {
  return await bcrypt.compare(password, hashedPassword);
};

export async function isAuthenticated(req: NextApiRequest, res: NextApiResponse) {
  const token = await jwt.getToken({ req, secret });
  
  if (token) {
    // Signed in
    return true;
  } else {
    // Not Signed in
    return false;
  };
}

export function useIsMounted(): () => boolean {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}