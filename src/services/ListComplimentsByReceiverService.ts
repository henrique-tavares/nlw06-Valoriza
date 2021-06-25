import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

export class ListComplimentsByReceiverService {
  async execute(receiver: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      relations: [ "userSender", "userReceiver", "tags" ],
      where: {
        userReceiver: receiver
      }
    });

    return compliments;
  }
}