import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../entities/AppError";
import { UserRepository } from "../repositories/UserRepository";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { userId } = request;

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(userId);

  if (!user) {
    throw new AppError("User does not exist anymore", 404);
  }

  const { admin } = user;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "User is not an admin"
  });
}