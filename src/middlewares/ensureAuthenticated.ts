import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [ , token ] = authToken.split(" ");

  try {
    const { sub } = verify(token, "b47516d9e74c963587d67c71059d17be");
    request.userId = sub as string;
    return next();
  } catch (error) {
    return response.status(401).end();
  }

}