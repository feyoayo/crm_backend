import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import passport from "passport";
import GetEnvData from "../utils/getEnvData";
import UsersModel from "../modules/auth/users.model";

class PassportJwtConfiguration {
  private getEnvData: GetEnvData;
  constructor() {
    this.getEnvData = new GetEnvData();
  }
  private async configCallback(payload: any, done: VerifiedCallback) {
    try {
      const user = await UsersModel.findById(payload.userId).select("email id");

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      console.log(e);
    }
  }

  public run() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.getEnvData.getData("TOKEN_SECRET_KEY"),
    };
    passport.use(new JwtStrategy(options, this.configCallback));
  }
}

const passportJwtConfig = new PassportJwtConfiguration();
export default passportJwtConfig;
