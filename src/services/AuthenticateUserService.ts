import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { AppError } from "../entities/AppError";
import { UserRepository } from "../repositories/UserRepository";

interface IAuthRequest {
  email: string,
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      email
    });

    if (!user || !password) {
      throw new AppError("Email or Password are incorrect", 400);
    }

    if (!(await compare(password, user.password))) {
      throw new AppError("Email or Password are incorrect", 400);
    }

    const token = sign(
      {
        email: user.email
      },
      "b47516d9e74c963587d67c71059d17be",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}