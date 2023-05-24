import { MiddlewareInterface } from "../types/middleware";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

export class PassportJwtMiddleware implements MiddlewareInterface {
  public run(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false });
    next();
  }
}
