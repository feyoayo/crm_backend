import { AuthRepository } from "./auth.repository";
import { UserRegistrationDto } from "./dto/user-registration.dto";

export class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  async userRegistration(userData: UserRegistrationDto) {
    const isUserExist = await this.authRepository.findUser(userData.email);
    if (isUserExist) {
      return "User exist";
    }
    const res = await this.authRepository.createUser(userData);
    if (res) {
      return res;
    } else {
      return null;
    }
  }
}
