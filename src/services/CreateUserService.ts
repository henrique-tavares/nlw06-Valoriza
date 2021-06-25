import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { AppError } from "../entities/AppError";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
  name: string,
  email: string,
  password: string;
  admin?: boolean;
}

export class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const userData = { name, email, password };
    for (let field in userData) {
      if (!userData[ field ]) {
        throw new AppError(`Field '${field}' is missing`, 404);
      }
    }

    const userRepository = getCustomRepository(UserRepository);

    const alreadyExistentUser = await userRepository.findOne({
      email
    });

    if (alreadyExistentUser) {
      throw new AppError("User already exists", 400);
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    });

    await userRepository.save(user);

    return user;
  }
}