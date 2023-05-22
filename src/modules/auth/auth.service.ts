import {AuthRepository} from "./auth.repository";
import {UserRegistrationDto, UserLoginDto} from "./dto";
import {UserAuthToken, EncryptPassword} from "../../utils";

export class AuthService {
  private authRepository: AuthRepository;
  private encryptPassword: EncryptPassword;
  private userAuthToken: UserAuthToken;
  constructor() {
    this.authRepository = new AuthRepository();
    this.encryptPassword = new EncryptPassword();
    this.userAuthToken = new UserAuthToken();
  }
  private async isUserExist(email: string) {
    return await this.authRepository.findUser(email);
  }

  public async userLogin(userData: UserLoginDto) {
    const login_candidate = await this.isUserExist(userData.email);
    if (!login_candidate) {
      return "User not exist";
    }
    const is_password_valid = this.encryptPassword.comparePassword({
      user_password: userData.password,
      hash_password: login_candidate.password,
    });
    if (!is_password_valid) {
      return "Login error";
    }
    const token = this.userAuthToken.createToken({
      email: login_candidate.email,
      userId: login_candidate._id,
    });
    return `Bearer ${token}`;
  }

  public async userRegistration(user_data: UserRegistrationDto) {
    if (await this.isUserExist(user_data.email)) {
      return "User exist";
    }

    const hash_password = this.encryptPassword.hashPassword(user_data.password);
    const user_payload = { ...user_data, password: hash_password };
    const res = await this.authRepository.createUser(user_payload);
    if (res) {
      return res;
    } else {
      return null;
    }
  }
}
