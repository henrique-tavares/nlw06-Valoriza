import { NextFunction, Request, Response } from "express";
import { AppError } from "../entities/AppError";

export function errorHandler(err: AppError, request: Request, response: Response, next: NextFunction) {
  if (err instanceof Error) {
    return response.status(err.status).json({ error: err.message });
  }

  return response.status(500).json({ status: "error", message: "Internal Server Error" });
}