import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";

export class AnalyticsController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/overview",
        method: "get",
        handler: this.getOverview,
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/analytics",
        method: "get",
        handler: this.getAnalytics,
        middlewares: [new PassportJwtMiddleware().run()],
      },
    ]);
  }
  getOverview(req: Request, res: Response) {
    return res.status(200).send("getOverview");
  }
  getAnalytics(req: Request, res: Response) {
    return res.status(200).send("getAnalytics");
  }
}
