import { Request, Response, Router } from "express";
import { IControllerPath } from "../types/controller-path";
import { BaseController } from "../utils/baseController";

export class AuthController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      { path: "/login", method: "post", handler: this.login },
      { path: "/registration", method: "post", handler: this.registration },
    ]);
  }

  registration(req: Request, res: Response) {
    return res.json({ status: "ok" });
  }
  login(req: Request, res: Response) {
    return res.json({ status: "ok", body: req.body });
  }
}
