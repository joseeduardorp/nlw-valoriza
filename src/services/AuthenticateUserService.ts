import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
 
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    /* verificar se email existe */
    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect!");
    }

    /* verificar se senha está incorreta */
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    /* gerar token */
    const token = sign({
      email: user.email
    }, "454d113f6530555446de8455fd0be608", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService };