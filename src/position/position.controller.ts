import { Request, Response } from "express";
import { BaseController } from "../utils/baseController";

export class PositionController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      { path: "/:category", method: "get", handler: this.getById },
      { path: "/", method: "post", handler: this.post },
      { path: "/:id", method: "delete", handler: this.delete },
      { path: "/:id", method: "patch", handler: this.patch },
    ]);
  }
  getById(req: Request, res: Response) {
    return res.send("get position");
  }
  post(req: Request, res: Response) {
    return res.send("post position");
  }
  patch(req: Request, res: Response) {
    return res.send("patch position");
  }
  delete(req: Request, res: Response) {
    return res.send("delete position");
  }
}
