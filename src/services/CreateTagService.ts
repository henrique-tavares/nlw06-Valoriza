import { getCustomRepository } from "typeorm";
import { AppError } from "../entities/AppError";
import { TagRepository } from "../repositories/TagRepository";

export class CreateTagService {
  async execute(name: string) {

    if (!name) {
      throw new AppError("Name is missing", 404);
    }

    const tagRepository = getCustomRepository(TagRepository);

    const alreadyExistentTag = await tagRepository.findOne({
      name
    });

    if (alreadyExistentTag) {
      throw new AppError("Tag already exists", 400);
    }

    const tag = tagRepository.create({
      name
    });

    await tagRepository.save(tag);

    return tag;
  }
}