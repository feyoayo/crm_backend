import { Router, Request, Response } from "express";
import { IControllerPath } from "../types/controller-path";

export abstract class BaseController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public ok(res: Response, message: string) {
    return res.status(200).json({ status: "ok", message });
  }

  protected bindRoutes(routes: IControllerPath[]) {
    for (let route of routes) {
      this.router[route.method](route.path, route.handler);
    }
  }
}
