import { Response, Request } from "express";
import { BaseController } from "../utils/baseController";

export class AnalyticsController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      { path: "/overview", method: "get", handler: this.getOverview },
      { path: "/analytics", method: "get", handler: this.getAnalytics },
    ]);
  }
  getOverview(req: Request, res: Response) {
    return res.status(200).send("getOverview");
  }
  getAnalytics(req: Request, res: Response) {
    return res.status(200).send("getAnalytics");
  }
}
