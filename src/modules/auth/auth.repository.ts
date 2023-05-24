import { UserRegistrationDto } from "./dto";
import UsersModel from "./users.model";

export class AuthRepository {
  async findUser(email: string) {
    return UsersModel.findOne({ email });
  }

  async getById(id: string, select?: string) {
    return UsersModel.findById(id).select(select ?? "");
  }

  async createUser({
    password,
    email,
    last_name,
    first_name,
  }: UserRegistrationDto) {
    const user = new UsersModel({
      email,
      password,
      last_name,
      first_name,
    });
    return await user.save();
  }
}
