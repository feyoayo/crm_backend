import { Router, Response } from "express";
import { IControllerPath } from "../types/controller-path";

export abstract class BaseController {
  private readonly _router: Router;

  protected constructor() {
    this._router = Router();
    this.errorMessage = this.errorMessage.bind(this);
  }

  get router() {
    return this._router;
  }
  public created<T>(res: Response, data: T) {
    return res.status(201).json({ status: "created", data });
  }
  public ok<T>(res: Response, data: T) {
    return res.status(200).json({ status: "ok", data });
  }
  public errorMessage(res: Response, message: string, code: number = 400) {
    return res.status(code).json({ status: false, message });
  }

  protected bindRoutes(routes: IControllerPath[]) {
    for (let route of routes) {
      const handler = route.handler.bind(this);
      const middlewares = route.middlewares?.map((m) => m) ?? [];
      const pipeline = middlewares ? [...middlewares, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
