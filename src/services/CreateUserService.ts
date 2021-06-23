import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
  name: string,
  email: string,
  admin?: boolean;
}

export class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    if (!name || !email) {
      throw new Error("Name or Email are missing");
    }

    const userRepository = getCustomRepository(UserRepository);

    const existentUser = await userRepository.findOne({
      email
    });

    if (existentUser) {
      throw new Error("User already exists");
    }

    const user = userRepository.create({
      name,
      email,
      admin
    });

    userRepository.save(user);

    return user;
  }
}