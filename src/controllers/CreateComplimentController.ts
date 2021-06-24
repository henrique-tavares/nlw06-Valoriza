import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { user_sender, user_receiver, tag_ids, message } = request.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      tag_ids,
      message
    });

    return response.json(compliment);
  }
}