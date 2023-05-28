import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";

export class OrderController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/",
        method: "get",
        handler: this.get,
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/",
        method: "post",
        handler: this.post,
        middlewares: [new PassportJwtMiddleware().run()],
      },
    ]);
  }
  get(req: Request, res: Response) {
    // this.ok(res, "get order request works");
    return res.status(200).send("get order work");
  }
  post(req: Request, res: Response) {
    return res.status(200).json({ message: "POST order work" });
  }
}
