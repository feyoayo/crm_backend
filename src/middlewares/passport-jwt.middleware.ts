import { MiddlewareInterface } from "../types/middleware";
import passport from "passport";

export class PassportJwtMiddleware implements MiddlewareInterface {
  public run() {
    return passport.authenticate("jwt", { session: false });
  }
}
