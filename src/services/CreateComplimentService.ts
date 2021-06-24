import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { TagRepository } from "../repositories/TagRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
  user_sender: string,
  user_receiver: string,
  tag_ids: string[],
  message: string;
}

export class CreateComplimentService {
  async execute({ user_sender, user_receiver, tag_ids = [], message }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const userRepository = getCustomRepository(UserRepository);
    const tagRepository = getCustomRepository(TagRepository);

    if (user_sender === user_receiver) {
      throw new Error("Sender and receiver cannot be the same");
    }

    const userSender = await userRepository.findOne(user_sender);
    const userReceiver = await userRepository.findOne(user_receiver);

    if (!userSender || !userReceiver) {
      throw new Error("Sender or receiver are invalid");
    }

    const tags = await tagRepository.findByIds(tag_ids);

    if (tags.length === 0 || tags.length !== tag_ids.length) {
      throw new Error("Invalid tag(s)");
    }

    const compliment = complimentRepository.create({
      userSender,
      userReceiver,
      tags,
      message
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}