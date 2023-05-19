import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import GetEnvData from "./getEnvData";

interface ComparePassword {
  user_password: string;
  hash_password: string;
}

class EncryptPassword {
  private getEnvData: GetEnvData;
  constructor() {
    this.getEnvData = new GetEnvData();
  }
  private genSalt() {
    const salt_rounds = parseInt(this.getEnvData.getData("SALT_ROUNDS"));
    if (!salt_rounds) {
      throw new Error("No salt rounds");
    }
    return genSaltSync(salt_rounds);
  }
  public hashPassword(password: string) {
    const salt = this.genSalt();
    return hashSync(password, salt);
  }
  public comparePassword({ user_password, hash_password }: ComparePassword) {
    return compareSync(user_password, hash_password);
  }
}

export default EncryptPassword;
