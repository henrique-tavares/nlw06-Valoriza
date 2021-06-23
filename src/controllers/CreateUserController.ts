import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {

  async handle(request: Request, response: Response) {
    const { name, email, admin } = request.body;

    const createUserSerivce = new CreateUserService();

    const user = await createUserSerivce.execute({ name, email, admin });

    return response.status(201).json(user);
  }
}