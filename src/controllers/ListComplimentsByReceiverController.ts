import { Request, Response } from "express";
import { ListComplimentsByReceiverService } from "../services/ListComplimentsByReceiverService";

export class ListComplimentsByReceiverController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listComplimentsByReceiverService = new ListComplimentsByReceiverService();

    const compliments = await listComplimentsByReceiverService.execute(userId);

    return response.json(compliments);
  }
}