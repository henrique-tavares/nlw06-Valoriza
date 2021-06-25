import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { user_receiver, tag_ids, message } = request.body;
    const { userId } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender: userId,
      user_receiver,
      tag_ids,
      message
    });

    return response.json(compliment);
  }
}