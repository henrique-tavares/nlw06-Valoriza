import { Request, Response } from "express";
import { ListComplimentsBySenderService } from "../services/ListComplimentsBySenderService";

export class ListComplimentsBySenderController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listComplimentsBySenderService = new ListComplimentsBySenderService();

    const compliments = await listComplimentsBySenderService.execute(userId);

    return response.json(compliments);
  }
}