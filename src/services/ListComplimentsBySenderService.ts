import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { classToPlain } from "class-transformer";

export class ListComplimentsBySenderService {
  async execute(sender: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      relations: [ "userSender", "userReceiver", "tags" ],
      where: {
        userSender: sender
      }
    });

    return classToPlain(compliments);
  }
}