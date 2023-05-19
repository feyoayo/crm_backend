import jwt from "jsonwebtoken";
import GetEnvData from "./getEnvData";

export class UserAuthToken {
  private readonly expiresIn: number = 60 * 60;
  private getEnvData: GetEnvData;
  constructor() {
    this.getEnvData = new GetEnvData();
  }
  public verifyToken() {}
  public createToken(tokenData: { [key: string]: unknown }) {
    const tokenKey = this.getEnvData.getData("TOKEN_SECRET_KEY");
    return jwt.sign(tokenData, tokenKey, {
      expiresIn: this.expiresIn,
    });
  }
}
export default UserAuthToken;
