import UsersModel from "./users.model";
import { UserRegistrationDto } from "./dto/user-registration.dto";

export class AuthRepository {
  async findUser(email: string) {
    return UsersModel.findOne({ email });
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
