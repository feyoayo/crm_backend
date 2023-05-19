import { Request, Response } from "express";
import { BaseController } from "../utils/baseController";
import { MongooseError } from "mongoose";
import { AuthService } from "./auth.service";
import { UserLoginDto, UserRegistrationDto } from "./dto";

export class AuthController extends BaseController {
  private authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
    this.bindRoutes([
      { path: "/login", method: "post", handler: this.login },
      { path: "/registration", method: "post", handler: this.registration },
    ]);
  }

  async registration(req: Request<{}, {}, UserRegistrationDto>, res: Response) {
    try {
      const data = req.body;
      const user = await this.authService.userRegistration(data);
      if (user === "User exist") {
        return this.errorMessage(res, "User exist", 401);
      }
      if (!user) {
        return this.errorMessage(res, "User not registered", 401);
      }
      return this.created(res, user);
    } catch (e) {
      const error = e as MongooseError;
      console.log(error.message);
      return this.errorMessage(res, "User not registered", 401);
    }
  }
  async login(req: Request<{}, {}, UserLoginDto>, res: Response) {
    try {
      const userLogin = await this.authService.userLogin(req.body);
      if (userLogin === "User not exist") {
        return this.errorMessage(res, "User not exist", 404);
      }
      if (userLogin === "Login error") {
        return this.errorMessage(res, "Login error", 400);
      }
      return this.ok(res, { token: userLogin });
    } catch (e) {
      const error = e as MongooseError;
      console.log(error.message);
      return this.errorMessage(res, "Login error", 401);
    }
  }
}
