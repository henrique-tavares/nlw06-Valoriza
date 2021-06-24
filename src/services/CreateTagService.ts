import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";

export class CreateTagService {
  async execute(name: string) {

    if (!name) {
      throw new Error("Name is missing");
    }

    const tagRepository = getCustomRepository(TagRepository);

    const alreadyExistentTag = await tagRepository.findOne({
      name
    });

    if (alreadyExistentTag) {
      throw new Error("Tag already exists");
    }

    const tag = tagRepository.create({
      name
    });

    await tagRepository.save(tag);

    return tag;
  }
}