import { Request, Response, Router } from "express";
import { BaseController } from "../utils/baseController";
import { UserRegistrationDto } from "./dto/user-registration.dto";
import { MongooseError } from "mongoose";
import { AuthService } from "./auth.service";

export class AuthController extends BaseController {
  private authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
    this.bindRoutes([
      { path: "/login", method: "put", handler: this.put },
      { path: "/registration", method: "post", handler: this.post },
    ]);
  }

  async post(req: Request<{}, {}, UserRegistrationDto>, res: Response) {
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
  put(req: Request, res: Response) {
    return res.json({ status: "ok", body: req.body });
  }
}
